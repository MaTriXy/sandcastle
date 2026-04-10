/**
 * Sandbox provider types — the pluggable interface for sandbox runtimes.
 *
 * Provider authors implement a small Promise-based interface. Sandcastle
 * handles worktree creation, git mount resolution, and commit extraction.
 */

/** Result of executing a command inside a sandbox. */
export interface ExecResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
}

/** Handle to a running bind-mount sandbox. */
export interface BindMountSandboxHandle {
  /** Absolute path to the workspace inside the sandbox. */
  readonly workspacePath: string;
  /** Execute a command inside the sandbox. */
  exec(command: string, options?: { cwd?: string }): Promise<ExecResult>;
  /** Execute a command, streaming stdout line-by-line. */
  execStreaming(
    command: string,
    onLine: (line: string) => void,
    options?: { cwd?: string },
  ): Promise<ExecResult>;
  /** Tear down the sandbox. */
  close(): Promise<void>;
}

/** Options passed to a bind-mount provider's `create` function. */
export interface BindMountCreateOptions {
  /** Host-side path to the worktree directory. */
  readonly worktreePath: string;
  /** Host-side path to the original repo root. */
  readonly hostRepoPath: string;
  /** Volume mounts to apply (host:sandbox pairs). */
  readonly mounts: Array<{
    hostPath: string;
    sandboxPath: string;
    readonly?: boolean;
  }>;
  /** Environment variables to inject into the sandbox. */
  readonly env: Record<string, string>;
}

/** Configuration for createBindMountSandboxProvider. */
export interface BindMountSandboxProviderConfig {
  /** Human-readable name for this provider (e.g. "docker", "podman"). */
  readonly name: string;
  /** Create a sandbox handle from the given options. */
  readonly create: (
    options: BindMountCreateOptions,
  ) => Promise<BindMountSandboxHandle>;
}

/**
 * A sandbox provider — the pluggable unit that `run()` and `createSandbox()` accept.
 * Tagged as "bind-mount" for internal dispatch.
 */
export interface SandboxProvider {
  /** @internal Discriminator for internal dispatch. */
  readonly tag: "bind-mount";
  /** Human-readable provider name. */
  readonly name: string;
  /** @internal Create a sandbox handle. */
  readonly create: (
    options: BindMountCreateOptions,
  ) => Promise<BindMountSandboxHandle>;
}

/**
 * Create a bind-mount sandbox provider from a config object.
 * The returned provider can be passed to `run()` or `createSandbox()`.
 */
export const createBindMountSandboxProvider = (
  config: BindMountSandboxProviderConfig,
): SandboxProvider => ({
  tag: "bind-mount",
  name: config.name,
  create: config.create,
});
