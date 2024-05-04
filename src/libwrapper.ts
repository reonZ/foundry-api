import { MODULE } from ".";

declare namespace libWrapper {
    type RegisterCallback<R extends Promisable<any> = Promisable<any>, A extends any[] = any[]> = (
        ...args: A
    ) => R;

    type RegisterWrappedCallback<
        R extends Promisable<any> = Promisable<any>,
        A extends any[] = any[]
    > = (wrapped: RegisterCallback<R, A>, ...args: A) => R;

    type RegisterMixedCallback<
        R extends Promisable<any> = Promisable<any>,
        A extends any[] = any[]
    > = (wrapped: RegisterCallback<R, A>, ...args: A) => R | never;

    type RegisterOverrideCallback<R extends Promisable<any> = Promisable<any>> = (
        ...args: any[]
    ) => R;

    type RegisterCallbacks<R extends Promisable<any> = Promisable<any>, A extends any[] = any[]> =
        | RegisterWrappedCallback<R, A>
        | RegisterOverrideCallback<R>
        | RegisterMixedCallback<R, A>;

    type RegisterType = "WRAPPER" | "OVERRIDE" | "MIXED";

    function register<R extends Promisable<any> = Promisable<any>, A extends any[] = any[]>(
        namespace: string,
        path: string,
        fn: RegisterCallbacks<R, A>,
        type: RegisterType
    ): number;

    function unregister(namespace: string, target: number): void;
}

function registerWrapper<P extends string | string[], R extends Promisable<any>>(
    path: P,
    fn: libWrapper.RegisterMixedCallback<R>,
    type: "MIXED"
): P extends string[] ? number[] : number;
function registerWrapper<P extends string | string[], R extends Promisable<any>>(
    path: P,
    fn: libWrapper.RegisterOverrideCallback<R>,
    type: "OVERRIDE"
): P extends string[] ? number[] : number;
function registerWrapper<P extends string | string[], R extends Promisable<any>>(
    path: P,
    fn: libWrapper.RegisterWrappedCallback<R>,
    type: "WRAPPER"
): P extends string[] ? number[] : number;
function registerWrapper<P extends string | string[]>(
    path: P,
    fn: libWrapper.RegisterCallback,
    type: libWrapper.RegisterType
): P extends string[] ? number[] : number {
    const ids: number[] = [];
    const paths: string[] = Array.isArray(path) ? path : [path];

    for (const key of paths) {
        const id = libWrapper.register(MODULE.id, key, fn, type);
        ids.push(id);
    }

    // @ts-ignore
    return ids.length === 1 ? ids[0] : ids;
}

function unregisterWrapper(id: number) {
    libWrapper.unregister(MODULE.id, id);
}

export type { libWrapper };
export { registerWrapper, unregisterWrapper };
