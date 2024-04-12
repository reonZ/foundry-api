type EventListener = (...args: any[]) => void;
declare function withEventManager<T extends {
    new (...args: any[]): {};
}>(constructor: T): {
    new (...args: any[]): {
        registerListener(event: string, listener: EventListener, options?: {
            once?: boolean;
            context?: any;
        } | boolean): number;
        removeListener(event: string, listener: EventListener | number): boolean;
        emitEvent(event: string, ...args: any[]): void;
        purgeListeners(): void;
    };
} & T;
declare class WithEventManager {
    registerListener(event: string, listener: EventListener, options?: {
        once?: boolean;
        context?: any;
    } | boolean): number;
    removeListener(event: string, listener: EventListener | number): boolean;
    emitEvent(event: string, ...args: any[]): void;
    purgeListeners(): void;
}
export type { WithEventManager };
export { withEventManager };
