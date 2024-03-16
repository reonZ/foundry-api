import { MODULE } from ".";

export declare namespace libWrapper {
    type RegisterCallback<
        R extends any | Promise<any> = any | Promise<any>,
        A extends any[] = any[]
    > = (...args: A) => R;

    type RegisterWrappedCallback<
        R extends any | Promise<any> = any | Promise<any>,
        A extends any[] = any[]
    > = (wrapped: RegisterCallback<R, A>, ...args: A) => R;

    type RegisterMixedCallback<
        R extends any | Promise<any> = any | Promise<any>,
        A extends any[] = any[]
    > = (wrapped: RegisterCallback<R, A>, ...args: A) => R | never;

    type RegisterOverrideCallback<
        R extends any | Promise<any> = any | Promise<any>
    > = (...args: any[]) => R;

    type RegisterCallbacks =
        | RegisterWrappedCallback
        | RegisterOverrideCallback
        | RegisterMixedCallback;

    type RegisterType = "WRAPPER" | "OVERRIDE" | "MIXED";

    function register(
        namespace: string,
        path: string,
        fn: RegisterCallbacks,
        type: RegisterType
    ): number;
}

export function registerWrapper<R extends any | Promise<any>>(
    path: string,
    fn: libWrapper.RegisterMixedCallback<R>,
    type: "MIXED"
): number;
export function registerWrapper<R extends any | Promise<any>>(
    path: string,
    fn: libWrapper.RegisterOverrideCallback<R>,
    type: "OVERRIDE"
): number;
export function registerWrapper<R extends any | Promise<any>>(
    path: string,
    fn: libWrapper.RegisterWrappedCallback<R>,
    type: "WRAPPER"
): number;
export function registerWrapper<R extends any | Promise<any>>(
    path: string,
    fn: libWrapper.RegisterCallbacks,
    type: libWrapper.RegisterType
): number {
    return libWrapper.register(MODULE.id, path, fn, type);
}
