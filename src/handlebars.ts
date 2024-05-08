import { MODULE, joinStr } from ".";

function templatePath(...path: string[]) {
    return `modules/${MODULE.id}/templates/${joinStr("/", path)}.hbs`;
}

function render(...args: [string, ...string[], Record<string, any>]) {
    const data = typeof args.at(-1) === "object" ? args.pop() : {};
    const path = templatePath(...(args as string[]));
    return renderTemplate(path, data as Record<string, any>);
}

export { templatePath, render };
