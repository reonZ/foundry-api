function registerUpstreamHook(event: string, listener: HookCallback) {
    const id = Hooks.on(event, listener);
    const index = Hooks.events[event].findIndex((x) => x.id === id);

    if (index !== 0) {
        const [hooked] = Hooks.events[event].splice(index, 1);
        Hooks.events[event].unshift(hooked);
    }

    return id;
}

export { registerUpstreamHook };
