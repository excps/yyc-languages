#!/bin/bash

echo "Fetching latest changes from remote..."
git fetch origin

if [ $? -ne 0 ]; then
    echo "❌ Failed to fetch from remote"
    exit 1
fi

echo "✅ Fetch complete"
echo ""

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch: $CURRENT_BRANCH"

# Find all version branches (both local and remote)
echo "Finding latest version branch..."

# Get all remote version branches and sort them
LATEST_BRANCH=$(git branch -r | grep -E 'origin/v[0-9]+\.[0-9]+\.[0-9]+$' | sed 's/origin\///' | sed 's/^[[:space:]]*//' | sort -V | tail -1)

if [ -z "$LATEST_BRANCH" ]; then
    echo "❌ No version branches found on remote"
    exit 1
fi

echo "Latest version branch: $LATEST_BRANCH"
echo ""

# Check if current branch is the latest
if [ "$CURRENT_BRANCH" = "$LATEST_BRANCH" ]; then
    echo "ℹ️  You are already on the latest branch"
    echo "   Pulling latest changes..."
    git pull origin "$CURRENT_BRANCH"

    if [ $? -eq 0 ]; then
        echo "✅ Successfully updated $CURRENT_BRANCH"
    else
        echo "❌ Failed to pull changes"
        exit 1
    fi
    exit 0
fi

# Ask for confirmation before merging
echo "About to merge $LATEST_BRANCH into $CURRENT_BRANCH"
read -p "Continue? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Merge cancelled"
    exit 0
fi

# Merge the latest branch
echo "Merging origin/$LATEST_BRANCH into $CURRENT_BRANCH..."
git merge "origin/$LATEST_BRANCH" --no-edit

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully merged $LATEST_BRANCH into $CURRENT_BRANCH"
    echo ""
    echo "Summary:"
    git log -1 --oneline
else
    echo ""
    echo "❌ Merge failed - there may be conflicts to resolve"
    echo "   Use 'git status' to see the conflicts"
    echo "   After resolving, use 'git commit' to complete the merge"
    exit 1
fi
