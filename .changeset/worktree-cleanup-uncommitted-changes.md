---
"@ai-hero/sandcastle": patch
---

Base worktree cleanup on uncommitted changes rather than run success/failure.

Previously, worktrees were always preserved on failure and always removed on success. Now the decision is based on whether the worktree has uncommitted changes (unstaged modifications, staged changes, or untracked files):

- Success + clean worktree: remove silently (same as before)
- Success + dirty worktree: preserve and print "uncommitted changes" message
- Failure + clean worktree: remove and print "no uncommitted changes" message
- Failure + dirty worktree: preserve with current preservation message

`RunResult` now includes an optional `preservedWorktreePath` field set when a successful run leaves a worktree behind due to uncommitted changes. `TimeoutError.preservedWorktreePath` and `AgentError.preservedWorktreePath` are only set when the worktree is actually preserved (dirty), not on every failure.
