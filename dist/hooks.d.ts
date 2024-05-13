declare function registerUpstreamHook(event: string, listener: HookCallback): number;
declare function createHook(hook: string, listener: HookCallback): {
    activate(): void;
    disable(): void;
    toggle(enabled: boolean): void;
};
export { createHook, registerUpstreamHook };
