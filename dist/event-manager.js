"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withEventManager = void 0;
function withEventManager(constructor) {
    let _id = 1;
    let _listeners = {};
    return class extends constructor {
        registerListener(event, listener, options) {
            _listeners[event] ??= [];
            const id = _id++;
            _listeners[event].push({
                id,
                listener,
                once: typeof options === "boolean" ? options : options?.once ?? false,
                context: typeof options === "object" ? options.context : undefined,
            });
            return id;
        }
        removeListener(event, listener) {
            const findFn = typeof listener === "number"
                ? (x) => x.id === listener
                : (x) => x.listener === listener;
            const index = _listeners[event]?.findIndex(findFn) ?? -1;
            if (index === -1)
                return false;
            _listeners[event].splice(index, 1);
            return true;
        }
        emitEvent(event, ...args) {
            const listeners = _listeners[event];
            if (!listeners)
                return;
            for (const { listener, once, context, id } of listeners) {
                if (context) {
                    listener.apply(context, args);
                }
                else {
                    listener(...args);
                }
                if (once) {
                    this.removeListener(event, id);
                }
            }
        }
        purgeListeners() {
            _listeners = {};
        }
    };
}
exports.withEventManager = withEventManager;
