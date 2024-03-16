import { MODULE, joinStr } from ".";

export function templatePath(...path: string[]) {
    return `modules/${MODULE.id}/templates/${joinStr("/", path)}.hbs`;
}

export function render(...args: [...string[], string | Record<string, unknown>]) {
    const data = typeof args.at(-1) === "object" ? args.splice(-1)[0] : {};
    const path = templatePath(...(args as string[]));
    return renderTemplate(path, data as Record<string, unknown>);
}
