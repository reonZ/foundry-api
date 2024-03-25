import * as R from "remeda";

export function joinStr(separator: "/" | "." | "-", ...path: (string | string[])[]) {
    return R.pipe(
        path,
        R.flatten(),
        R.filter((x) => typeof x === "string"),
        R.join(separator)
    );
}

export function safeSplit(str: string, selector = ",") {
    return str
        .split(selector)
        .map((s) => s.trim())
        .filter(Boolean);
}
