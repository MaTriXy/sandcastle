---
"@ai-hero/sandcastle": patch
---

`createSandbox()` now uses the shared `startSandbox` helper, adding support for isolated sandbox providers (e.g. Vercel, Daytona). Each `run()` call syncs commits back to the host worktree via `applyToHost`.
