declare global {
    class Module {}

    interface Module {
        api?: Record<string, unknown>;
    }
}

export type {};
