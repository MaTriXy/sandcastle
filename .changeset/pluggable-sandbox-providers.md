---
"@ai-hero/sandcastle": patch
---

Add pluggable sandbox provider abstraction with bind-mount provider types, `createBindMountSandboxProvider` factory, and `docker()` factory function. `run()` and `createSandbox()` now accept an optional `sandbox` option, defaulting to Docker internally.
