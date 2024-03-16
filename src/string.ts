import { filter, flatten, join, pipe } from "remeda";

export function joinStr(separator: "/" | "." | "-", ...path: (string | string[])[]) {
    return pipe(
        path,
        flatten(),
        filter((x) => typeof x === "string"),
        join(separator)
    );
}
