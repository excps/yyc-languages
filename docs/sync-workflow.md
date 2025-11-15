# Sync Workflow (`npm run pull`)

This document describes the intelligent sync workflow implemented in `scripts/sync-latest.sh`.

## Overview

The sync tool automatically handles different scenarios when syncing your local branch with the latest version branch from the remote repository. It prevents the problematic behavior of merging newer versions into older version branches.

## Workflow Diagram

```mermaid
flowchart TD
    Start([npm run pull]) --> Fetch[Fetch from Remote]
    Fetch --> GetCurrent[Get Current Branch]
    GetCurrent --> CheckDetached{Detached HEAD?}

    CheckDetached -->|Yes| ErrorDetached[❌ Error: Checkout a branch first]
    CheckDetached -->|No| FindLatest[Find Latest Version Branch]

    FindLatest --> CheckLatestExists{Latest branch exists?}
    CheckLatestExists -->|No| ErrorNoLatest[❌ Error: No version branches found]
    CheckLatestExists -->|Yes| AnalyzeState[Analyze Current State]

    AnalyzeState --> CheckUncommitted{Has uncommitted changes?}
    CheckUncommitted -->|Yes| SetUncommitted[HAS_UNCOMMITTED = true]
    CheckUncommitted -->|No| SetClean[HAS_UNCOMMITTED = false]

    SetUncommitted --> CheckCommitted{Has local commits not on latest?}
    SetClean --> CheckCommitted

    CheckCommitted -->|Yes| SetCommitted[HAS_COMMITTED = true]
    CheckCommitted -->|No| SetNoCommitted[HAS_COMMITTED = false]

    SetCommitted --> CompareVersions{Current == Latest?}
    SetNoCommitted --> CompareVersions

    %% SCENARIO 1: Already on Latest
    CompareVersions -->|Yes| Scenario1[SCENARIO 1: On Latest Branch]
    Scenario1 --> CheckRemoteUpdates{Remote has updates?}
    CheckRemoteUpdates -->|No| Success1[✅ Already up to date]
    CheckRemoteUpdates -->|Yes| CheckUncommitted1A{Has uncommitted?}

    CheckUncommitted1A -->|No| Pull1A[Pull latest changes]
    Pull1A --> Success1A[✅ Updated successfully]

    CheckUncommitted1A -->|Yes| Stash1B[Stash uncommitted changes]
    Stash1B --> Pull1B[Pull latest changes]
    Pull1B --> Pop1B[Pop stashed changes]
    Pop1B --> CheckConflict1B{Conflicts?}
    CheckConflict1B -->|No| Success1B[✅ Changes restored]
    CheckConflict1B -->|Yes| ErrorConflict1B[❌ Resolve conflicts manually]

    %% SCENARIO 2: On Older Branch
    CompareVersions -->|No| Scenario2[SCENARIO 2: On Older Branch]
    Scenario2 --> CheckCommitted2{Has committed changes?}

    %% SCENARIO 2A: With Committed Changes
    CheckCommitted2 -->|Yes| ShowCommits[Display local commits]
    ShowCommits --> Menu[Interactive Menu]
    Menu --> Choice{User choice?}

    Choice -->|1: Cherry-pick| StashIfNeeded2A1{Uncommitted?}
    StashIfNeeded2A1 -->|Yes| Stash2A1[Stash changes]
    StashIfNeeded2A1 -->|No| Checkout2A1[Checkout latest branch]
    Stash2A1 --> Checkout2A1
    Checkout2A1 --> CherryPick2A1[Cherry-pick commits]
    CherryPick2A1 --> CheckCherryConflict{Conflicts?}
    CheckCherryConflict -->|Yes| ErrorCherry[❌ Resolve cherry-pick conflicts]
    CheckCherryConflict -->|No| PopIfNeeded2A1{Was stashed?}
    PopIfNeeded2A1 -->|Yes| Pop2A1[Pop stash]
    PopIfNeeded2A1 -->|No| Success2A1[✅ Synced with commits]
    Pop2A1 --> Success2A1

    Choice -->|2: New branch| CreateBranch2A2[Create feature branch from latest]
    CreateBranch2A2 --> CherryPick2A2[Cherry-pick commits]
    CherryPick2A2 --> Success2A2[✅ New branch created]

    Choice -->|3: Stay| Stay2A3[Stay on current branch]
    Stay2A3 --> Success2A3[ℹ️ No sync performed]

    Choice -->|4: Discard| Confirm{Type 'yes' to confirm?}
    Confirm -->|No| Cancelled[Cancelled]
    Confirm -->|Yes| Discard2A4[Checkout latest, discard commits]
    Discard2A4 --> Success2A4[✅ Switched, commits discarded]

    %% SCENARIO 2B: Without Committed Changes
    CheckCommitted2 -->|No| CheckUncommitted2B{Has uncommitted?}

    CheckUncommitted2B -->|Yes| Stash2B[Stash uncommitted changes]
    CheckUncommitted2B -->|No| Checkout2B[Checkout latest branch]
    Stash2B --> Checkout2B

    Checkout2B --> Pull2B[Pull latest if branch exists locally]
    Pull2B --> CheckUncommitted2BRestore{Was stashed?}

    CheckUncommitted2BRestore -->|Yes| Pop2B[Pop stashed changes]
    CheckUncommitted2BRestore -->|No| Success2B[✅ Switched to latest]
    Pop2B --> CheckConflict2B{Conflicts?}
    CheckConflict2B -->|No| Success2B
    CheckConflict2B -->|Yes| ErrorConflict2B[❌ Resolve conflicts manually]

    %% Styling
    classDef errorClass fill:#ff6b6b,stroke:#c92a2a,color:#fff
    classDef successClass fill:#51cf66,stroke:#2f9e44,color:#fff
    classDef warningClass fill:#ffd43b,stroke:#fab005,color:#000
    classDef infoClass fill:#74c0fc,stroke:#1971c2,color:#000
    classDef processClass fill:#e0e0e0,stroke:#666,color:#000

    class ErrorDetached,ErrorNoLatest,ErrorConflict1B,ErrorCherry,ErrorConflict2B errorClass
    class Success1,Success1A,Success1B,Success2A1,Success2A2,Success2A4,Success2B successClass
    class Stay2A3,Success2A3,Cancelled warningClass
    class Scenario1,Scenario2,Menu infoClass
```

## Scenarios Explained

### Scenario 1: Already on Latest Branch

**Scenario 1A - No uncommitted changes**
- Simply pulls the latest changes from remote
- Clean and straightforward update

**Scenario 1B - With uncommitted changes**
1. Stashes your uncommitted changes with timestamp
2. Pulls latest changes from remote
3. Restores your stashed changes
4. If conflicts occur, provides clear instructions for manual resolution

### Scenario 2: On Older Version Branch

**Scenario 2A - With committed changes (not on latest)**

Presents an interactive menu with 4 options:

1. **Cherry-pick to latest (Recommended)**
   - Stashes uncommitted changes if any
   - Switches to latest branch
   - Applies your commits one by one
   - Restores uncommitted changes if stashed
   - Best for ongoing work that should continue on latest

2. **Create new feature branch**
   - Creates a new branch from latest (named `feature-YYYYMMDD-HHMMSS`)
   - Cherry-picks your commits to the new branch
   - Useful for experimental work or feature development

3. **Stay on current branch**
   - No sync performed
   - Use when you intentionally need to work on an older version

4. **Discard commits and switch**
   - **DESTRUCTIVE** - requires typing "yes" to confirm
   - Switches to latest branch without preserving commits
   - Only use if commits were mistakes

**Scenario 2B - With uncommitted changes only (no commits)**
1. Stashes uncommitted changes if any
2. Switches to latest version branch
3. Pulls latest if branch exists locally
4. Restores uncommitted changes
5. Handles conflicts with clear recovery instructions

## Safety Features

- **No version mixing**: Never merges latest into older branches
- **Auto-stashing**: Preserves uncommitted work automatically
- **Conflict handling**: Clear instructions when conflicts occur
- **Detached HEAD detection**: Prevents operations in invalid states
- **Double confirmation**: Required for destructive operations
- **Colored output**: Visual feedback for errors, success, warnings
- **Recovery instructions**: Always tells you how to recover from errors

## Error Recovery

### Stash Conflicts
If stash restoration fails:
```bash
# Option 1: Resolve conflicts and drop stash
git stash drop

# Option 2: Discard stashed changes
git stash drop

# Option 3: View all stashes
git stash list
```

### Cherry-pick Conflicts
If cherry-pick fails:
```bash
# Option 1: Resolve conflicts and continue
git cherry-pick --continue

# Option 2: Abort cherry-pick
git cherry-pick --abort
```

## Command Reference

```bash
# Run sync tool
npm run pull

# Manual git commands (if needed)
git stash list              # View all stashes
git stash pop               # Restore most recent stash
git stash drop              # Remove most recent stash
git cherry-pick --continue  # Continue after resolving conflicts
git cherry-pick --abort     # Abort cherry-pick operation
```

## Best Practices

1. **Before syncing**: Review your changes with `git status`
2. **Regular syncing**: Run `npm run pull` frequently to stay updated
3. **Commit often**: Small, frequent commits make cherry-picking easier
4. **Clear messages**: Write descriptive commit messages for easier tracking
5. **Test after sync**: Run `npm run dev` to verify everything works after syncing
