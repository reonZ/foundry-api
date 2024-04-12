declare function joinStr(separator: "/" | "." | "-", ...path: (string | string[])[]): string;
declare function safeSplit(str: string, selector?: string): string[];
declare function beautity(str: string): string;
declare function stringBoolean(b: boolean | string): "false" | "true";
declare function stringNumber(n: number | string): `${number}`;
export { beautity, joinStr, safeSplit, stringBoolean, stringNumber };
