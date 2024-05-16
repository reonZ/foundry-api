declare namespace libWrapper {
    type RegisterCallback<R extends Promisable<any> = Promisable<any>, A extends any[] = any[]> = (...args: A) => R;
    type RegisterWrappedCallback<R extends Promisable<any> = Promisable<any>, A extends any[] = any[]> = (wrapped: RegisterCallback<R, A>, ...args: A) => R;
    type RegisterMixedCallback<R extends Promisable<any> = Promisable<any>, A extends any[] = any[]> = (wrapped: RegisterCallback<R, A>, ...args: A) => R | never;
    type RegisterOverrideCallback<R extends Promisable<any> = Promisable<any>> = (...args: any[]) => R;
    type RegisterCallbacks<R extends Promisable<any> = Promisable<any>, A extends any[] = any[]> = RegisterWrappedCallback<R, A> | RegisterOverrideCallback<R> | RegisterMixedCallback<R, A>;
    type RegisterType = "WRAPPER" | "OVERRIDE" | "MIXED";
    function register<R extends Promisable<any> = Promisable<any>, A extends any[] = any[]>(namespace: string, path: string, fn: RegisterCallbacks<R, A>, type: RegisterType): number;
    function unregister(namespace: string, target: number): void;
}
declare function registerWrapper<P extends string | string[], R extends Promisable<any>>(path: P, fn: libWrapper.RegisterMixedCallback<R>, type: "MIXED"): P extends string[] ? number[] : number;
declare function registerWrapper<P extends string | string[], R extends Promisable<any>>(path: P, fn: libWrapper.RegisterOverrideCallback<R>, type: "OVERRIDE"): P extends string[] ? number[] : number;
declare function registerWrapper<P extends string | string[], R extends Promisable<any>>(path: P, fn: libWrapper.RegisterWrappedCallback<R>, type: "WRAPPER"): P extends string[] ? number[] : number;
declare function unregisterWrapper(id: number): void;
declare function createWrapper(path: string, callback: libWrapper.RegisterCallback, options?: {
    context?: InstanceType<new (...args: any[]) => any>;
    type?: libWrapper.RegisterType;
    onDisable?: () => void;
    onActivate?: () => void;
}): {
    activate(): void;
    disable(): void;
    toggle(enabled: boolean): void;
};
export type { libWrapper };
export { createWrapper, registerWrapper, unregisterWrapper };
