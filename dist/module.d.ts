declare const MODULE: {
    readonly id: string;
    readonly name: string;
    readonly current: Module;
    throwError(str: string): never;
    error(str: string, error?: Error): void;
    log(str: string): void;
    path(...path: (string | string[])[]): `${string}.${string}`;
    register(id: string, name: string): void;
};
declare function getActiveModule<T extends Module>(name: string): T | undefined;
export { MODULE, getActiveModule };
