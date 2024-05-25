declare global {
    type HookCallback = (...args: any[]) => void;

    type RegisteredHook = {
        id: number;
        once: boolean;
        hook: string;
        fn: HookCallback;
    };

    namespace Hooks {
        const events: Record<string, RegisteredHook[]>;

        function once(event: "init", listener: () => void): void;
        function once(event: "setup", listener: () => void): void;
        function once(event: "ready", listener: () => void): void;
        function once(event: string, listener: HookCallback): void;

        function on(event: string, listener: HookCallback): number;
        function off(event: string, listener: HookCallback | number): void;

        function callAll(event: string, ...args: any[]): void;
    }
}

export type {};
