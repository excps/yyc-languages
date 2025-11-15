#!/bin/bash

# Remote build script
# Builds the latest Docker image on the remote build server

# Configuration
REMOTE_HOST="doc0"
REMOTE_PATH="/home/andi/docker/yyc-languages"
# SSH_KEY="-i ~/.ssh/ed25519_doc0"  # Add your SSH key path if needed, e.g., "-i ~/.ssh/id_rsa"

echo "🚀 Starting remote deployment to $REMOTE_HOST"
echo ""

# Function to run remote commands
run_remote() {
    ssh $REMOTE_HOST "$1"
}

# Step 1: Check SSH connection
echo "1️⃣  Checking SSH connection..."
if ! run_remote "echo 'Connection successful'"; then
    echo "❌ Failed to connect to $REMOTE_HOST"
    exit 1
fi
echo "✅ Connected to $REMOTE_HOST"
echo ""

# Step 2: Pull latest changes
echo "2️⃣  Fetching latest code from GitHub..."
run_remote "cd $REMOTE_PATH && git fetch origin"

if [ $? -ne 0 ]; then
    echo "❌ Failed to fetch from GitHub"
    exit 1
fi
echo "✅ Fetch complete"
echo ""

# Step 3: Find and checkout latest version branch
echo "3️⃣  Finding latest version branch..."
LATEST_BRANCH=$(run_remote "cd $REMOTE_PATH && git branch -r | grep -E 'origin/v[0-9]+\.[0-9]+\.[0-9]+$' | sed 's/origin\///' | sed 's/^[[:space:]]*//' | sort -V | tail -1")

if [ -z "$LATEST_BRANCH" ]; then
    echo "❌ No version branches found"
    exit 1
fi

echo "Latest branch: $LATEST_BRANCH"

# Clean any package-lock.json changes before checkout to prevent conflicts
run_remote "cd $REMOTE_PATH && git checkout -- package-lock.json 2>/dev/null || true"

run_remote "cd $REMOTE_PATH && git checkout $LATEST_BRANCH && git pull origin $LATEST_BRANCH"

if [ $? -ne 0 ]; then
    echo "❌ Failed to checkout $LATEST_BRANCH"
    exit 1
fi
echo "✅ Checked out $LATEST_BRANCH"
echo ""

# Step 4: Build React app and Docker image
echo "4️⃣  Installing dependencies and building React app..."
echo "   Using npm ci for deterministic builds..."

# Try npm ci first (uses lock file, doesn't modify it, faster)
run_remote "cd $REMOTE_PATH && npm ci"

if [ $? -ne 0 ]; then
    echo "   ⚠️  npm ci failed, falling back to clean install..."
    run_remote "cd $REMOTE_PATH && rm -rf node_modules package-lock.json && npm install"

    if [ $? -ne 0 ]; then
        echo "❌ Dependency installation failed"
        exit 1
    fi
fi

echo "   Dependencies installed successfully"
echo "   Building React app..."

run_remote "cd $REMOTE_PATH && npm run build"

if [ $? -ne 0 ]; then
    echo "❌ React build failed"
    exit 1
fi
echo "✅ React app built successfully"
echo ""

echo "5️⃣  Building Docker image..."
run_remote "cd $REMOTE_PATH && docker build -t yyc-languages:$LATEST_BRANCH -t yyc-languages:latest ."

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed"
    exit 1
fi
echo "✅ Docker image built successfully"
echo ""

# Step 6: Check if image has changed before pushing
echo "6️⃣  Checking if image has changed..."

# Get the newly built image ID
NEW_IMAGE_ID=$(run_remote "docker images yyc-languages:$LATEST_BRANCH --format '{{.ID}}' | head -1")
echo "   New image ID: $NEW_IMAGE_ID"

# Try to pull existing image from registry and get its ID
EXISTING_IMAGE_ID=$(run_remote "docker pull localhost:5001/yyc-languages:$LATEST_BRANCH 2>/dev/null && docker images localhost:5001/yyc-languages:$LATEST_BRANCH --format '{{.ID}}' | head -1" || echo "")

if [ -n "$EXISTING_IMAGE_ID" ]; then
    echo "   Existing image ID: $EXISTING_IMAGE_ID"

    if [ "$NEW_IMAGE_ID" = "$EXISTING_IMAGE_ID" ]; then
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "ℹ️  No changes detected in Docker image"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "The newly built image is identical to the existing image in the registry."
        echo "Version: $LATEST_BRANCH"
        echo "Image ID: $NEW_IMAGE_ID"
        echo ""
        echo "Deployment stopped. No push or update needed."
        exit 0
    else
        echo "   Image has changed, proceeding with push..."
    fi
else
    echo "   No existing image found in registry, proceeding with push..."
fi
echo ""

# Step 7: Push image to local registry
echo "7️⃣  Pushing image to localhost:5001 registry..."
run_remote "cd $REMOTE_PATH && docker tag yyc-languages:$LATEST_BRANCH localhost:5001/yyc-languages:$LATEST_BRANCH && docker push localhost:5001/yyc-languages:$LATEST_BRANCH && docker tag yyc-languages:latest localhost:5001/yyc-languages:latest && docker push localhost:5001/yyc-languages:latest"

if [ $? -ne 0 ]; then
    echo "❌ Docker push failed"
    exit 1
fi
echo "✅ Image pushed to registry"
echo ""

# Step 8: Update Portainer stack
echo "8️⃣  Updating Portainer stack..."
run_remote "source ~/.zshrc 2>/dev/null || source ~/.bashrc 2>/dev/null || true && cd $REMOTE_PATH && PORTAINER_URL=http://192.168.1.10:9000 ./scripts/portainer-update.sh $LATEST_BRANCH"

if [ $? -ne 0 ]; then
    echo "⚠️  Warning: Portainer update failed (continuing anyway)"
    echo "   You can manually update the stack or check PORTAINER_TOKEN"
else
    echo "✅ Portainer stack updated"
fi
echo ""

# Step 9: Cleanup old images
echo "9️⃣  Cleaning up old Docker images..."
echo "   Keeping: latest 3 unique images"

# Get the 3 most recent unique image IDs to keep
KEEP_IMAGE_IDS=$(run_remote "docker images yyc-languages --format '{{.ID}}' | uniq | head -3 | tr '\n' '|' | sed 's/|$//'" )

echo "   Preserving image IDs: $KEEP_IMAGE_IDS"

# Remove images older than 14 days that aren't in the keep list
run_remote "docker images yyc-languages --format '{{.ID}} {{.CreatedAt}}' | awk '\$2 ~ /days/ && \$2+0 > 14 {print \$1}' | grep -vE '($KEEP_IMAGE_IDS)' | sort -u | xargs -r docker rmi -f 2>/dev/null || true"

# Also remove dangling images
run_remote "docker image prune -f > /dev/null 2>&1 || true"

echo "✅ Cleanup complete"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Deployment complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Deployed version: $LATEST_BRANCH"
echo "Remote host: $REMOTE_HOST"
echo "Remote path: $REMOTE_PATH"
echo ""
echo "Docker images (local registry):"
echo "  - localhost:5001/yyc-languages:$LATEST_BRANCH"
echo "  - localhost:5001/yyc-languages:latest"
echo ""
echo "Portainer stack updated and redeployed automatically"
echo "Check status at: http://192.168.1.10:9000/#!/stacks"
