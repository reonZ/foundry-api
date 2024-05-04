import { MODULE } from "./module";

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as {
    new <T>(...args: any[]): (...args: any[]) => Promise<T>;
};

function isInstanceOf<T>(obj: any, name: string): obj is T {
    if (typeof obj !== "object") return false;

    let cursor = Reflect.getPrototypeOf(obj);
    while (cursor) {
        if (cursor.constructor.name === name) return true;
        cursor = Reflect.getPrototypeOf(cursor);
    }

    return false;
}

function getInMemory<T>(obj: object, ...path: string[]) {
    return getProperty<T>(obj, `modules.${MODULE.id}.${path.join(".")}`);
}

function setInMemory<T>(obj: object, ...args: [...string[], T]) {
    const value = args.splice(-1)[0];
    return setProperty(obj, `modules.${MODULE.id}.${args.join(".")}`, value);
}

function getInMemoryAndSetIfNot<T>(obj: object, ...args: [...string[], (() => T) | T]) {
    const value = args.splice(-1)[0] as T | (() => T);
    const current = getInMemory<T>(obj, ...(args as string[]));
    if (current != null) return current;

    // @ts-ignore
    const result = typeof value === "function" ? value() : value;
    setInMemory(obj, ...(args as string[]), result);
    return result as T;
}

function deleteInMemory(obj: object, ...path: string[]) {
    const split = ["modules", MODULE.id, ...path.flatMap((x) => x.split("."))];
    const last = split.pop() as string;

    let cursor: any = obj;

    for (const key of split) {
        if (typeof cursor !== "object" || !(key in cursor)) return true;
        cursor = cursor[key];
    }

    return delete cursor[last];
}

export {
    AsyncFunction,
    deleteInMemory,
    isInstanceOf,
    getInMemory,
    getInMemoryAndSetIfNot,
    setInMemory,
};
