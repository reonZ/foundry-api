declare global {
    class Module {
        active: boolean;
    }

    interface Module {
        api?: Record<string, unknown>;
    }
}

export type {};
