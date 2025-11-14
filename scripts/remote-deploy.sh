#!/bin/bash

# Remote deployment script
# Deploys the latest version to the build server

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

# Step 6: Deploy via docker-compose
echo "6️⃣  Deploying new version..."
run_remote "cd $REMOTE_PATH && make compose-up"

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    exit 1
fi
echo "✅ Deployment successful"
echo ""

# Step 7: Verify deployment
echo "7️⃣  Verifying deployment..."
sleep 3
run_remote "cd $REMOTE_PATH && docker ps | grep yyc-languages"

if [ $? -eq 0 ]; then
    echo "✅ Container is running"
else
    echo "⚠️  Warning: Could not verify container status"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Deployment complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Deployed version: $LATEST_BRANCH"
echo "Remote host: $REMOTE_HOST"
echo "Remote path: $REMOTE_PATH"
echo ""
echo "To check logs, run:"
echo "  ssh $REMOTE_USER@$REMOTE_HOST 'cd $REMOTE_PATH && make compose-logs'"
