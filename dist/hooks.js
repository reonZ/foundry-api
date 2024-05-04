"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUpstreamHook = void 0;
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
