declare const AsyncFunction: new <T>(...args: any[]) => (...args: any[]) => Promise<T>;
declare function isInstanceOf<T>(obj: any, name: string): obj is T;
declare function getInMemory<T>(obj: object, ...path: string[]): T | undefined;
declare function setInMemory<T>(obj: object, ...args: [...string[], T]): boolean;
declare function getInMemoryAndSetIfNot<T>(obj: object, ...args: [...string[], (() => T) | T]): T;
declare function deleteInMemory(obj: object, ...path: string[]): boolean;
export { AsyncFunction, deleteInMemory, isInstanceOf, getInMemory, getInMemoryAndSetIfNot, setInMemory, };
