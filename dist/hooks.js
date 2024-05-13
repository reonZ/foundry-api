"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUpstreamHook = exports.createHook = void 0;
function registerUpstreamHook(event, listener) {
    const id = Hooks.on(event, listener);
    const index = Hooks.events[event].findIndex((x) => x.id === id);
    if (index !== 0) {
        const [hooked] = Hooks.events[event].splice(index, 1);
        Hooks.events[event].unshift(hooked);
    }
    return id;
}
exports.registerUpstreamHook = registerUpstreamHook;
function createHook(hook, listener) {
    let hookId = null;
    return {
        activate() {
            if (hookId !== null)
                return;
            hookId = Hooks.on(hook, listener);
        },
        disable() {
            if (hookId === null)
                return;
            Hooks.off(hook, hookId);
            hookId = null;
        },
        toggle(enabled) {
            if (enabled)
                this.activate();
            else
                this.disable();
        },
    };
}
exports.createHook = createHook;
