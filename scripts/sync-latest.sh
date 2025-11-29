#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper function to print colored messages
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }

# Helper function to create stash with timestamp
create_stash() {
    local stash_name="sync-latest-$(date +%s)"
    git stash push -u -m "$stash_name"
    if [ $? -eq 0 ]; then
        echo "$stash_name"
        return 0
    else
        return 1
    fi
}

# Helper function to pop stash with conflict handling
pop_stash() {
    local stash_ref="$1"
    git stash pop
    local result=$?

    if [ $result -ne 0 ]; then
        print_error "Conflict detected when applying stashed changes"
        echo ""
        echo "Your changes are still in the stash. You can:"
        echo "  1. Resolve conflicts manually, then run: git stash drop"
        echo "  2. Discard stashed changes: git stash drop"
        echo "  3. Keep stash for later: git stash list"
        return 1
    fi

    return 0
}

# Helper function to check if working directory is clean
is_working_dir_clean() {
    git diff-index --quiet HEAD -- 2>/dev/null
    return $?
}

# Helper function to check if there are uncommitted changes
has_uncommitted_changes() {
    ! git diff-index --quiet HEAD -- 2>/dev/null || \
    [ -n "$(git ls-files --others --exclude-standard)" ]
}

# Helper function to get commits on current branch not on target branch
get_unique_commits() {
    local target_branch="$1"
    git log --oneline "origin/$target_branch..HEAD" 2>/dev/null
}

# Helper function to cherry-pick commits
cherry_pick_commits() {
    local target_branch="$1"
    local commits=$(git log --reverse --format="%H" "origin/$target_branch..HEAD")

    if [ -z "$commits" ]; then
        return 0
    fi

    echo ""
    print_info "Cherry-picking commits to $target_branch..."

    for commit in $commits; do
        local msg=$(git log -1 --format="%s" "$commit")
        echo "  → $msg"

        git cherry-pick "$commit"
        if [ $? -ne 0 ]; then
            print_error "Cherry-pick failed for commit: $msg"
            echo ""
            echo "Resolve conflicts and run:"
            echo "  git cherry-pick --continue"
            echo "Or abort with:"
            echo "  git cherry-pick --abort"
            return 1
        fi
    done

    print_success "All commits cherry-picked successfully"
    return 0
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔄 YYC-Languages Sync Tool"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Fetch from remote
print_info "Fetching latest changes from remote..."
git fetch origin --prune

if [ $? -ne 0 ]; then
    print_error "Failed to fetch from remote"
    exit 1
fi

print_success "Fetch complete"
echo ""

# Step 2: Get current branch and validate
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
print_info "Current branch: $CURRENT_BRANCH"

# Check for detached HEAD
if [ "$CURRENT_BRANCH" = "HEAD" ]; then
    print_error "You are in detached HEAD state"
    echo ""
    echo "Please checkout a branch first:"
    echo "  git checkout main"
    echo "  or"
    echo "  git checkout -b new-branch-name"
    exit 1
fi

# Step 3: Find latest version branch
print_info "Finding latest version branch..."

LATEST_BRANCH=$(git branch -r | grep -E 'origin/v[0-9]+\.[0-9]+\.[0-9]+$' | \
                sed 's/origin\///' | sed 's/^[[:space:]]*//' | sort -V | tail -1)

if [ -z "$LATEST_BRANCH" ]; then
    print_error "No version branches found on remote"
    exit 1
fi

print_success "Latest version: $LATEST_BRANCH"
echo ""

# Step 4: Analyze current state
HAS_UNCOMMITTED=false
HAS_COMMITTED=false
UNIQUE_COMMITS=""

if has_uncommitted_changes; then
    HAS_UNCOMMITTED=true
    print_warning "Uncommitted changes detected"
fi

# Check if current branch is a version branch
if [[ "$CURRENT_BRANCH" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    # Only check for unique commits if not on latest
    if [ "$CURRENT_BRANCH" != "$LATEST_BRANCH" ]; then
        UNIQUE_COMMITS=$(get_unique_commits "$LATEST_BRANCH")
        if [ -n "$UNIQUE_COMMITS" ]; then
            HAS_COMMITTED=true
            print_warning "Local commits detected (not on latest branch)"
        fi
    fi
else
    print_warning "Not on a version branch (current: $CURRENT_BRANCH)"
    echo ""
    echo "This script works best with version branches (v#.#.#)"
    echo "You can continue, but switching to latest may not be appropriate."
    echo ""
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Sync cancelled"
        exit 0
    fi
    echo ""
fi

# Step 5: Route to appropriate handler based on scenario

# SCENARIO 1: Already on latest branch
if [ "$CURRENT_BRANCH" = "$LATEST_BRANCH" ]; then
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    print_info "Already on latest branch: $LATEST_BRANCH"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    # Check if remote has updates
    LOCAL_COMMIT=$(git rev-parse HEAD)
    REMOTE_COMMIT=$(git rev-parse "origin/$LATEST_BRANCH")

    if [ "$LOCAL_COMMIT" = "$REMOTE_COMMIT" ]; then
        print_success "Branch is up to date with remote"
        exit 0
    fi

    # SCENARIO 1A: Latest branch + no uncommitted changes
    if [ "$HAS_UNCOMMITTED" = false ]; then
        print_info "Pulling latest changes..."
        git pull origin "$LATEST_BRANCH"

        if [ $? -eq 0 ]; then
            print_success "Successfully updated $LATEST_BRANCH"
        else
            print_error "Failed to pull changes"
            exit 1
        fi
        exit 0
    fi

    # SCENARIO 1B: Latest branch + uncommitted changes
    print_info "Stashing uncommitted changes..."
    STASH_NAME=$(create_stash)

    if [ $? -ne 0 ]; then
        print_error "Failed to stash changes"
        exit 1
    fi

    print_success "Changes stashed"

    print_info "Pulling latest changes..."
    git pull origin "$LATEST_BRANCH"

    if [ $? -ne 0 ]; then
        print_error "Failed to pull changes"
        echo ""
        echo "Your changes are still stashed. Restore with:"
        echo "  git stash pop"
        exit 1
    fi

    print_success "Pull complete"

    print_info "Restoring stashed changes..."
    if pop_stash "$STASH_NAME"; then
        print_success "Changes restored successfully"
    else
        exit 1
    fi

    exit 0
fi

# SCENARIO 2: On older branch (need to switch to latest)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_info "Switching from $CURRENT_BRANCH → $LATEST_BRANCH"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# SCENARIO 2A: Older branch + committed changes
if [ "$HAS_COMMITTED" = true ]; then
    echo "You have local commits on $CURRENT_BRANCH that are not on $LATEST_BRANCH:"
    echo ""
    echo "$UNIQUE_COMMITS"
    echo ""
    echo "What would you like to do?"
    echo ""
    echo "  1) Cherry-pick commits to $LATEST_BRANCH (recommended)"
    echo "  2) Create new branch from $LATEST_BRANCH with your commits"
    echo "  3) Stay on $CURRENT_BRANCH (no sync)"
    echo "  4) Discard commits and switch to $LATEST_BRANCH (DESTRUCTIVE)"
    echo ""
    read -p "Enter choice (1-4): " -n 1 -r choice
    echo ""
    echo ""

    case $choice in
        1)
            # Stash uncommitted if needed
            STASH_NAME=""
            if [ "$HAS_UNCOMMITTED" = true ]; then
                print_info "Stashing uncommitted changes..."
                STASH_NAME=$(create_stash)
                if [ $? -ne 0 ]; then
                    print_error "Failed to stash changes"
                    exit 1
                fi
                print_success "Changes stashed"
            fi

            # Switch to latest
            print_info "Checking out $LATEST_BRANCH..."
            git checkout "$LATEST_BRANCH" 2>/dev/null || git checkout -b "$LATEST_BRANCH" "origin/$LATEST_BRANCH"

            if [ $? -ne 0 ]; then
                print_error "Failed to checkout $LATEST_BRANCH"
                exit 1
            fi

            # Cherry-pick commits
            if ! cherry_pick_commits "$LATEST_BRANCH"; then
                exit 1
            fi

            # Restore uncommitted changes if stashed
            if [ -n "$STASH_NAME" ]; then
                print_info "Restoring uncommitted changes..."
                if pop_stash "$STASH_NAME"; then
                    print_success "Changes restored successfully"
                else
                    exit 1
                fi
            fi

            print_success "Successfully synced to $LATEST_BRANCH with your commits"
            ;;

        2)
            NEW_BRANCH="feature-$(date +%Y%m%d-%H%M%S)"
            print_info "Creating new branch: $NEW_BRANCH"

            git checkout -b "$NEW_BRANCH" "origin/$LATEST_BRANCH"

            if [ $? -ne 0 ]; then
                print_error "Failed to create new branch"
                exit 1
            fi

            if ! cherry_pick_commits "$LATEST_BRANCH"; then
                exit 1
            fi

            print_success "Created $NEW_BRANCH from $LATEST_BRANCH with your commits"
            ;;

        3)
            print_info "Staying on $CURRENT_BRANCH - no sync performed"
            exit 0
            ;;

        4)
            print_warning "This will DISCARD your local commits!"
            read -p "Are you absolutely sure? (yes/no): " -r confirm
            echo ""

            if [ "$confirm" != "yes" ]; then
                echo "Cancelled"
                exit 0
            fi

            git checkout "$LATEST_BRANCH" 2>/dev/null || git checkout -b "$LATEST_BRANCH" "origin/$LATEST_BRANCH"

            if [ $? -eq 0 ]; then
                print_success "Switched to $LATEST_BRANCH (commits discarded)"
            else
                print_error "Failed to checkout $LATEST_BRANCH"
                exit 1
            fi
            ;;

        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac

    exit 0
fi

# SCENARIO 2B: Older branch + uncommitted changes (no commits)
if [ "$HAS_UNCOMMITTED" = true ]; then
    print_info "Stashing uncommitted changes..."
    STASH_NAME=$(create_stash)

    if [ $? -ne 0 ]; then
        print_error "Failed to stash changes"
        exit 1
    fi

    print_success "Changes stashed"
fi

# Switch to latest branch
print_info "Checking out $LATEST_BRANCH..."
git checkout "$LATEST_BRANCH" 2>/dev/null || git checkout -b "$LATEST_BRANCH" "origin/$LATEST_BRANCH"

if [ $? -ne 0 ]; then
    print_error "Failed to checkout $LATEST_BRANCH"
    if [ "$HAS_UNCOMMITTED" = true ]; then
        echo ""
        echo "Your changes are still stashed. Restore with:"
        echo "  git stash pop"
    fi
    exit 1
fi

# Pull latest if branch already existed locally
git pull origin "$LATEST_BRANCH" 2>/dev/null

print_success "Switched to $LATEST_BRANCH"

# Restore stashed changes if any
if [ "$HAS_UNCOMMITTED" = true ]; then
    print_info "Restoring stashed changes..."
    if pop_stash "$STASH_NAME"; then
        print_success "Changes restored successfully"
    else
        exit 1
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_success "Sync complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
print_info "Now on: $LATEST_BRANCH"

exit 0
