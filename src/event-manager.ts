type EventListener = (...args: any[]) => void;
type RegisteredListener = { listener: EventListener; id: number; context?: any; once?: boolean };

function withEventManager<T extends { new (...args: any[]): {} }>(constructor: T) {
    let _id = 1;
    let _listeners: Record<string, RegisteredListener[]> = {};

    return class extends constructor {
        registerListener(
            event: string,
            listener: EventListener,
            options?: { once?: boolean; context?: any } | boolean
        ) {
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

        removeListener(event: string, listener: EventListener | number) {
            const findFn =
                typeof listener === "number"
                    ? (x: RegisteredListener) => x.id === listener
                    : (x: RegisteredListener) => x.listener === listener;
            const index = _listeners[event]?.findIndex(findFn) ?? -1;

            if (index === -1) return false;

            _listeners[event].splice(index, 1);

            return true;
        }

        emitEvent(event: string, ...args: any[]) {
            const listeners = _listeners[event];

            if (!listeners) return;

            for (const { listener, once, context, id } of listeners) {
                if (context) {
                    listener.apply(context, args);
                } else {
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

declare class WithEventManager {
    registerListener(
        event: string,
        listener: EventListener,
        options?: { once?: boolean; context?: any } | boolean
    ): number;
    removeListener(event: string, listener: EventListener | number): boolean;
    emitEvent(event: string, ...args: any[]): void;
    purgeListeners(): void;
}

export type { WithEventManager };
export { withEventManager };
