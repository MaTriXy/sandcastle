import { describe, expect, it, vi } from "vitest";
import {
  createBindMountSandboxProvider,
  type BindMountSandboxHandle,
  type SandboxProvider,
} from "./SandboxProvider.js";

describe("createBindMountSandboxProvider", () => {
  const makeMockHandle = (): BindMountSandboxHandle => ({
    workspacePath: "/workspace",
    exec: vi.fn(async () => ({ stdout: "", stderr: "", exitCode: 0 })),
    execStreaming: vi.fn(async () => ({ stdout: "", stderr: "", exitCode: 0 })),
    close: vi.fn(async () => {}),
  });

  it("returns a SandboxProvider with tag 'bind-mount'", () => {
    const provider = createBindMountSandboxProvider({
      name: "test-provider",
      create: async () => makeMockHandle(),
    });

    expect(provider.tag).toBe("bind-mount");
    expect(provider.name).toBe("test-provider");
  });

  it("delegates create() to the config's create function", async () => {
    const handle = makeMockHandle();
    const createFn = vi.fn(async () => handle);
    const provider = createBindMountSandboxProvider({
      name: "test-provider",
      create: createFn,
    });

    const options = {
      worktreePath: "/tmp/worktree",
      hostRepoPath: "/home/user/repo",
      mounts: [{ hostPath: "/a", sandboxPath: "/b" }],
      env: { FOO: "bar" },
    };

    const result = await provider.create(options);

    expect(createFn).toHaveBeenCalledWith(options);
    expect(result).toBe(handle);
  });

  it("satisfies the SandboxProvider type", () => {
    const provider: SandboxProvider = createBindMountSandboxProvider({
      name: "typed",
      create: async () => makeMockHandle(),
    });

    expect(provider.tag).toBe("bind-mount");
  });
});
