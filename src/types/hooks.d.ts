declare global {
    namespace Hooks {
        function once(event: "init", fn: () => void): void;
        function once(event: "setup", fn: () => void): void;
        function once(event: "ready", fn: () => void): void;
        function once(event: string, fn: (...args: unknown[]) => void): void;

        function on(event: string, fn: (...args: unknown[]) => void): void;
    }
}

export type {};
