function registerUpstreamHook(event: string, listener: HookCallback) {
    const id = Hooks.on(event, listener);
    const index = Hooks.events[event].findIndex((x) => x.id === id);

    if (index !== 0) {
        const [hooked] = Hooks.events[event].splice(index, 1);
        Hooks.events[event].unshift(hooked);
    }

    return id;
}

function createHook(hook: string, listener: HookCallback) {
    let hookId: number | null = null;

    return {
        activate() {
            if (hookId !== null) return;
            hookId = Hooks.on(hook, listener);
        },
        disable() {
            if (hookId === null) return;
            Hooks.off(hook, hookId);
            hookId = null;
        },
        toggle(enabled: boolean) {
            if (enabled) this.activate();
            else this.disable();
        },
    };
}

export { createHook, registerUpstreamHook };
