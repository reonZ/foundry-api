import * as R from "remeda";

function arrayIncludesOne(array: string[], other: string[]) {
    return other.some((value) => array.includes(value));
}

function compareArrays<T extends any>(arr1: T[], arr2: T[], unique = false) {
    arr1 = unique ? R.compact(arr1) : arr1;
    arr2 = unique ? R.compact(arr2) : arr2.slice();

    if (arr1.length !== arr2.length) return false;

    for (const value1 of arr1) {
        const index = arr2.findIndex((value2) => value1 === value2);
        if (index === -1) return false;
        arr2.splice(index, 1);
    }

    return true;
}

function getOnly<T>(collection: T[] | Set<T> | undefined, condition?: (value: T) => boolean) {
    if (!collection) return;

    const isArray = Array.isArray(collection);
    if ((isArray && collection.length !== 1) || (!isArray && collection.size !== 1)) return;

    const value = isArray ? collection[0] : collection.first();
    if (!value) return;

    return ((!condition || condition(value)) && value) || undefined;
}

function setHasAny<T>(set: Set<T>, values: T[]) {
    return values.some((value) => set.has(value));
}

export { arrayIncludesOne, compareArrays, getOnly, setHasAny };
