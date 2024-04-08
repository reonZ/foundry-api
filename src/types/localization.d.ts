declare global {
    class Localization {
        lang: string;
        localize(key: string): string;
        format(key: string, data: Record<string, string | number | boolean>): string;
        has(key: string, fallback?: boolean): boolean;
    }
}

export type {};
