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

export { AsyncFunction, isInstanceOf };
