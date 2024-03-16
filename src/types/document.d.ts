declare global {
    interface DocumentModificationContext {
        parent?: FoundryDocument;
        pack?: string;
        noHook?: boolean;
        index?: boolean;
        indexFields?: string[];
        keepId?: boolean;
        keepEmbeddedIds?: boolean;
        temporary?: boolean;
        render?: boolean;
        renderSheet?: boolean;
        diff?: boolean;
        recursive?: boolean;
        isUndo?: boolean;
        deleteAll?: boolean;
    }

    interface DocumentSourceData {
        _id: string;
        name: string;
        flags: Record<string, unknown>;
    }

    class FoundryDocument<D extends DocumentSourceData = DocumentSourceData> {
        static fromSource(
            source: object,
            options?: { strict?: boolean; [k: string]: any }
        ): FoundryDocument;
        static create<D extends DocumentSourceData = DocumentSourceData>(
            data: Partial<D>,
            context?: DocumentModificationContext
        ): Promise<FoundryDocument>;
        get id(): string;
        updateSource<D extends Record<string, any>>(
            changes: D,
            options?: { fallback?: boolean; dryRun?: boolean }
        ): Partial<{ [K in keyof D]: D[K] }>;
        getFlag<T>(scope: string, key: string): T | undefined;
        setFlag(scope: string, key: string, value: unknown): Promise<this>;
        unsetFlag(scope: string, key: string): Promise<this>;
        update(data?: Updatable<D>, context?: DocumentModificationContext): Promise<this>;
    }
}

export type {};
