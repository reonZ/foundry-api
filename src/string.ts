import * as R from "remeda";

function joinStr(separator: "/" | "." | "-", ...path: (string | string[])[]) {
    return R.pipe(
        path,
        R.flatten(),
        R.filter((x) => typeof x === "string"),
        R.join(separator)
    );
}

function safeSplit(str: string, selector = ",") {
    return str
        .split(selector)
        .map((s) => s.trim())
        .filter(Boolean);
}

function beautity(str: string) {
    return str.replaceAll(/[-_.]([a-z])/g, (_, c) => ` ${c.toUpperCase()}`).capitalize();
}

function stringBoolean(b: boolean | string) {
    return String(b) as StringBoolean;
}

function stringNumber(n: number | string) {
    return String(n) as StringNumber;
}

export { beautity, joinStr, safeSplit, stringBoolean, stringNumber };
