#!/bin/bash

# Remote build script
# Builds the latest Docker image on the remote build server

# Configuration
REMOTE_USER="andi"
REMOTE_HOST="doc0"
REMOTE_PATH="/home/andi/docker/yyc-languages"
# SSH_KEY="-i ~/.ssh/ed25519_doc0"  # Add your SSH key path if needed, e.g., "-i ~/.ssh/id_rsa"

echo "🚀 Starting remote deployment to $REMOTE_HOST"
echo ""

# Function to run remote commands
run_remote() {
    # ssh $SSH_KEY $REMOTE_USER@$REMOTE_HOST "$1"
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

run_remote "cd $REMOTE_PATH && git checkout $LATEST_BRANCH && git pull origin $LATEST_BRANCH"

if [ $? -ne 0 ]; then
    echo "❌ Failed to checkout $LATEST_BRANCH"
    exit 1
fi
echo "✅ Checked out $LATEST_BRANCH"
echo ""

# Step 4: Build new Docker image
echo "4️⃣  Building Docker image..."
run_remote "cd $REMOTE_PATH && make docker-build"

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed"
    exit 1
fi
echo "✅ Docker image built successfully"
echo ""

# Step 5: Push image to local registry
echo "5️⃣  Pushing image to localhost:5001 registry..."
run_remote "cd $REMOTE_PATH && make docker-push-local"

if [ $? -ne 0 ]; then
    echo "❌ Docker push failed"
    exit 1
fi
echo "✅ Image pushed to registry"
echo ""

# Step 6: Update Portainer stack
echo "6️⃣  Updating Portainer stack..."
run_remote "source ~/.zshrc 2>/dev/null || source ~/.bashrc 2>/dev/null || true && cd $REMOTE_PATH && PORTAINER_URL=http://localhost:9000 ./scripts/portainer-update.sh $LATEST_BRANCH"

if [ $? -ne 0 ]; then
    echo "⚠️  Warning: Portainer update failed (continuing anyway)"
    echo "   You can manually update the stack or check PORTAINER_TOKEN"
else
    echo "✅ Portainer stack updated"
fi
echo ""

# Step 7: Cleanup old images
echo "7️⃣  Cleaning up old Docker images..."
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
echo "Check status at: http://$REMOTE_HOST:9000/#!/stacks"
