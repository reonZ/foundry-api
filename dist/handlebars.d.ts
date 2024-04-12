declare function templatePath(...path: string[]): string;
declare function render(...args: [...string[], string | Record<string, unknown>]): Promise<string>;
export { templatePath, render };
