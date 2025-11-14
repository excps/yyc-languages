#!/bin/bash

# Get current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Check if branch follows version pattern (v#.#.#)
if [[ ! $CURRENT_BRANCH =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: Current branch '$CURRENT_BRANCH' does not follow version pattern (v#.#.#)"
    echo "Please switch to a version branch or create one first"
    exit 1
fi

# Extract version numbers
VERSION=${CURRENT_BRANCH#v}
IFS='.' read -r -a VERSION_PARTS <<< "$VERSION"
MAJOR="${VERSION_PARTS[0]}"
MINOR="${VERSION_PARTS[1]}"
PATCH="${VERSION_PARTS[2]}"

# Increment patch version
NEW_PATCH=$((PATCH + 1))
NEW_VERSION="v${MAJOR}.${MINOR}.${NEW_PATCH}"

echo "Current version: $CURRENT_BRANCH"
echo "New version: $NEW_VERSION"

# Check if new branch already exists
if git show-ref --verify --quiet refs/heads/$NEW_VERSION; then
    echo "Error: Branch $NEW_VERSION already exists"
    exit 1
fi

# Create and checkout new branch
git checkout -b $NEW_VERSION

# Update package.json version (remove 'v' prefix for package.json)
PACKAGE_VERSION="${MAJOR}.${MINOR}.${NEW_PATCH}"
if [ -f package.json ]; then
    # Use sed to update version in package.json
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"$PACKAGE_VERSION\"/" package.json
    else
        # Linux
        sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$PACKAGE_VERSION\"/" package.json
    fi
    echo "Updated package.json to version $PACKAGE_VERSION"
fi

# Stage all changes
git add -A

# Get commit message from argument or prompt
if [ -z "$1" ]; then
    echo ""
    echo "Enter commit message (will be prefixed with '$NEW_VERSION'):"
    read -r COMMIT_MSG
else
    COMMIT_MSG="$1"
fi

# Create commit with version prefix
git commit -m "$(cat <<EOF
$NEW_VERSION $COMMIT_MSG
EOF
)"

echo ""
echo "✅ Successfully created version $NEW_VERSION"
echo "   Updated package.json and committed changes"
echo ""
echo "Next steps:"
echo "  - Push to remote: git push -u origin $NEW_VERSION"
echo "  - Or continue working on this version"
