---
"@ai-hero/sandcastle": patch
---

Remove the `interactive` CLI command and `buildInteractiveArgs` from `AgentProvider` interface. The interactive CLI was hardcoded to Docker and bypassed the provider abstraction. It is being replaced by a programmatic `interactive()` API (see #317).
