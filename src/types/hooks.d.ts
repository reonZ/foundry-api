declare global {
	namespace Hooks {
		function on(event: "init", fn: () => void): void;
		function on(event: "setup", fn: () => void): void;
		function on(event: "ready", fn: () => void): void;
		function on(event: string, fn: (...args: unknown[]) => void): void;
	}
}

export type {};
