function arrayIncludesOne(array: string[], other: string[]) {
    return other.some((value) => array.includes(value));
}

export { arrayIncludesOne };
