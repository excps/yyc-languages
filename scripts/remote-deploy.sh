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

# Step 4: Stop existing containers
echo "4️⃣  Stopping existing containers..."
run_remote "cd $REMOTE_PATH && make compose-down || true"
echo "✅ Containers stopped"
echo ""

# Step 5: Build new Docker image
echo "5️⃣  Building Docker image..."
run_remote "cd $REMOTE_PATH && make docker-build"

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed"
    exit 1
fi
echo "✅ Docker image built successfully"
echo ""

# Step 6: Cleanup old images
echo "6️⃣  Cleaning up old Docker images..."
echo "   Keeping: latest tag + 3 most recent version tags"

# Get the 3 most recent version tags to keep
KEEP_TAGS=$(run_remote "docker images yyc-languages --format '{{.Tag}}' | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | sort -V -r | head -3 | tr '\n' '|' | sed 's/|$//'" )

echo "   Preserving tags: $KEEP_TAGS and latest"

# Remove images older than 14 days, excluding the tags we want to keep
run_remote "docker images yyc-languages --format '{{.Repository}}:{{.Tag}} {{.CreatedAt}}' | grep -v 'latest' | grep -vE '($KEEP_TAGS)' | awk '\$3 ~ /days?/ && \$2 > 14 {print \$1}' | xargs -r docker rmi 2>/dev/null || true"

# Also remove dangling images
run_remote "docker image prune -f > /dev/null 2>&1 || true"

echo "✅ Cleanup complete"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Build complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Built version: $LATEST_BRANCH"
echo "Remote host: $REMOTE_HOST"
echo "Remote path: $REMOTE_PATH"
echo ""
echo "Docker images:"
echo "  - yyc-languages:$LATEST_BRANCH"
echo "  - yyc-languages:latest"
echo ""
echo "To deploy the container manually, run:"
echo "  ssh $REMOTE_HOST 'cd $REMOTE_PATH && make compose-up'"
