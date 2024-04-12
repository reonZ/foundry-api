declare const AsyncFunction: new <T>(...args: any[]) => (...args: any[]) => Promise<T>;
declare function isInstanceOf<T>(obj: any, name: string): obj is T;
export { AsyncFunction, isInstanceOf };
