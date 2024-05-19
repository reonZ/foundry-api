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

function registerWrapper<P extends string | string[]>(
    path: P,
    callback: libWrapper.RegisterCallback,
    type: libWrapper.RegisterType,
    context?: InstanceType<new (...args: any[]) => any>
): P extends string[] ? number[] : number {
    const ids: number[] = [];
    const paths: string[] = Array.isArray(path) ? path : [path];

    const wrapped = context
        ? function (this: any, ...args: any[]) {
              args.unshift(this);
              callback.apply(context, args);
          }
        : callback;

    for (const key of paths) {
        const id = libWrapper.register(MODULE.id, key, wrapped, type);
        ids.push(id);
    }

    // @ts-ignore
    return ids.length === 1 ? ids[0] : ids;
}

function unregisterWrapper(id: number) {
    libWrapper.unregister(MODULE.id, id);
}

function createWrapper(
    path: string,
    callback: libWrapper.RegisterCallback,
    options: {
        context?: InstanceType<new (...args: any[]) => any>;
        type?: libWrapper.RegisterType;
        onDisable?: () => void;
        onActivate?: () => void;
    } = {}
) {
    let wrapperId: number | null = null;

    return {
        activate() {
            if (wrapperId !== null) return;
            // @ts-ignore
            wrapperId = registerWrapper(path, callback, options.type ?? "WRAPPER", options.context);
            options.onActivate?.();
        },
        disable() {
            if (wrapperId === null) return;

            unregisterWrapper(wrapperId);
            wrapperId = null;
            options.onDisable?.();
        },
        toggle(enabled: boolean) {
            if (enabled) this.activate();
            else this.disable();
        },
    };
}

export type { libWrapper };
export { createWrapper, registerWrapper, unregisterWrapper };
