declare function arrayIncludesOne(array: string[], other: string[]): boolean;
declare function compareArrays<T extends any>(arr1: T[], arr2: T[], unique?: boolean): boolean;
declare function getOnly<T>(collection: T[] | Set<T> | undefined, condition?: (value: T) => boolean): NonNullable<T> | undefined;
export { arrayIncludesOne, compareArrays, getOnly };
