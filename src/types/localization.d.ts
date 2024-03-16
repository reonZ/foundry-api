declare global {
    class Localization {
        localize(key: string): string;
        format(key: string, data: Record<string, string>): string;
        has(key: string, fallback?: boolean): boolean;
    }
}

export type {};
