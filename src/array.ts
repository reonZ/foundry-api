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

export { arrayIncludesOne, compareArrays };
