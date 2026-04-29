---
"@ai-hero/sandcastle": patch
---

Fix `branchStrategy.baseBranch` being silently dropped when calling `sandcastle.run()` with a worktree-based sandbox. New branches now correctly fork from the requested `baseBranch` instead of the host's HEAD.
