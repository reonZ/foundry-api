declare global {
    interface String {
        capitalize(): string;
        titleCase(): string;
        stripScripts(): string;
        slugify(replacement?: string, strict?: boolean): string;
    }

    interface Number {
        almostEqual(n: number, e?: number): boolean;
        ordinalString(): string;
        paddedString(digits: number): string;
        signedString(): string;
        toNearest(interval?: number, method?: string): number;
        between(a: number, b: number, inclusive?: boolean): boolean;
    }

    interface NumberConstructor {
        isNumeric(n: unknown): boolean;
        fromString(n: string | number): Number;
        between(num: number, a: number, b: number, inclusive?: boolean): boolean;
    }

    interface Math {
        clamped(num: number, min: number, max: number): number;
        mix(a: number, b: number, w: number): number;
        normalizeDegrees(degrees: number, base?: number): number;
        normalizeRadians(radians: number): number;
        roundDecimals(number: number, places: number): number;
        toDegrees(angle: number): number;
        toRadians(angle: number): number;
        oscillation(
            minVal: number,
            maxVal: number,
            t: number,
            p?: number | undefined,
            func?: (n: number) => number
        ): number;
    }

    interface Array<T> {
        deepFlatten(): T[];
        equals(other: T[]): boolean;
        partition(rule: (value: T) => number): [T, T];
        filterJoin(sep: string): string;
        findSplice(find: (element: T) => boolean, replace?: T): T | null;
    }

    interface ArrayConstructor {
        fromRange<T extends number>(n: number, min?: number): T[];
    }

    interface Set<T> {
        difference(other: Set<T>): Set<T>;
        difference<U>(other: Set<U>): Set<T | U>;
        symmetricDifference(other: Set<T>): Set<T>;
        symmetricDifference<U>(other: Set<U>): Set<T | U>;
        equals(other: Set<unknown>): boolean;
        first(): T | undefined;
        intersection(other: Set<T>): Set<T>;
        intersection<U>(other: Set<U>): Set<T | U>;
        intersects(other: Set<unknown>): boolean;
        union(other: Set<T>): Set<T>;
        union<U>(other: Set<U>): Set<T | U>;
        isSubset(other: Set<unknown>): boolean;
        toObject(): T[];
        every<U extends T = T>(
            test: (value: T, index: number, set: Set<T>) => value is U
        ): this is Set<U>;
        every(test: (value: T, index: number, set: Set<T>) => boolean): boolean;
        filter<U extends T = T>(test: (value: T, index: number, set: Set<T>) => value is U): Set<U>;
        filter(test: (value: T, index: number, set: Set<T>) => boolean): Set<T>;
        find<U extends T = T>(
            test: (value: T, index: number, obj: Set<T>) => value is U
        ): U | undefined;
        find(test: (value: T, index: number, obj: Set<T>) => boolean): T | undefined;
        map<U>(transform: (value: T, index: number, set: Set<T>) => U): Set<U>;
        reduce<U>(
            reducer: (previousValue: U, currentValue: T, currentIndex: number, set: Set<T>) => U,
            accumulator: U
        ): U;
        reduce(
            reducer: (previousValue: T, currentValue: T, currentIndex: number, set: Set<T>) => T,
            accumulator: T
        ): T;
        some(test: (value: T, index: number, set: Set<T>) => boolean): boolean;
    }
}

export type {};
