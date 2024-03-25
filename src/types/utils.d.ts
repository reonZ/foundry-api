declare global {
    namespace foundry {
        namespace utils {
            function randomID(): string;
            function flattenObject<O extends CyclicRecord>(o: O): FlattenedCyclicRecord<O>;
            function renderTemplate(path: string, data: Record<string, unknown>): Promise<string>;
            function deepClone<T>(original: T, options?: { strict: boolean }): T;
            function isSubclass(cls: unknown, parent: Function): cls is typeof FoundryDocument;
            function isEmpty(value: unknown): boolean;
            function getProperty<T = unknown>(target: any, key: string): T | undefined;
            function setProperty(object: object, key: string, value: any): boolean;
            function mergeObject<T extends object, U extends object = T>(
                original: T,
                other?: U,
                options?: {
                    insertKeys?: boolean;
                    insertValues?: boolean;
                    overwrite?: boolean;
                    recursive?: boolean;
                    inplace?: boolean;
                    enforceTypes?: boolean;
                    performDeletions?: boolean;
                }
            ): T & U;
            function loadTemplates(paths: Record<string, string> | string[]): Promise<Function[]>;
            function debounce<T extends unknown[]>(
                callback: (...args: T) => unknown,
                delay?: number
            ): (...args: T) => void;
        }
    }

    const randomID: typeof foundry.utils.randomID;
    const flattenObject: typeof foundry.utils.flattenObject;
    const renderTemplate: typeof foundry.utils.renderTemplate;
    const deepClone: typeof foundry.utils.deepClone;
    const isSubclass: typeof foundry.utils.isSubclass;
    const isEmpty: typeof foundry.utils.isEmpty;
    const getProperty: typeof foundry.utils.getProperty;
    const setProperty: typeof foundry.utils.setProperty;
    const mergeObject: typeof foundry.utils.mergeObject;
    const loadTemplates: typeof foundry.utils.loadTemplates;
    const debounce: typeof foundry.utils.debounce;
}

export type {};
