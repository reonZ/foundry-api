declare global {
    class Notifications {
        notify(
            message: string,
            type?: string,
            options?: { permanent?: boolean; console?: boolean; localize?: boolean }
        ): void;
    }
}

export type {};
