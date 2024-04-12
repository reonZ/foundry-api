declare global {
    interface DocumentModificationContext<TParent extends FoundryDocument = FoundryDocument> {
        parent?: TParent;
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

    type DocumentUUID = string;

    interface DocumentSourceData<
        TType extends string = string,
        TSystem extends Record<string, any> = Record<string, any>
    > {
        _id: string | null;
        name: string;
        type: TType;
        flags: { [k: string]: any };
        system: TSystem & { [k: string]: any };
    }

    type DocumentUpdateContext = Omit<
        DocumentModificationContext,
        "deleteAll" | "index" | "keepId" | "keepEmbeddedIds" | "temporary"
    >;

    interface DocumentCloneContext extends Omit<DocumentConstructionContext<null>, "parent"> {
        save?: boolean;
        keepId?: boolean;
    }

    class FoundryDocument<TParent = any> {
        static fromSource(
            source: object,
            options?: { strict?: boolean; [k: string]: any }
        ): FoundryDocument;
        // static create<D extends DocumentSourceData = DocumentSourceData>(
        //     data: Partial<D>,
        //     context?: DocumentModificationContext
        // ): Promise<FoundryDocument>;

        static get implementation(): typeof FoundryDocument;

        get id(): string;
        get name(): string;
        get isOwner(): boolean;
        get parent(): TParent;
        get uuid(): string;
        get link(): string;

        prepareBaseData(): void;
        updateSource<D extends Record<string, any>>(
            changes: D,
            options?: { fallback?: boolean; dryRun?: boolean }
        ): Partial<{ [K in keyof D]: D[K] }>;
        getFlag<T>(scope: string, key: string): T | undefined;
        setFlag(scope: string, key: string, value: unknown): Promise<this>;
        unsetFlag(scope: string, key: string): Promise<this>;
        update(
            data: Record<string, unknown>,
            context?: DocumentModificationContext<this>
        ): Promise<this | undefined>;
        toObject(source?: boolean): this["_source"];
        delete(context?: DocumentModificationContext): Promise<this | undefined>;

        clone(
            data: Record<string, unknown> | undefined,
            context: DocumentCloneContext & { save: true }
        ): Promise<this>;
        clone(
            data?: Record<string, unknown>,
            context?: DocumentCloneContext & { save?: false }
        ): this;
        clone(data?: Record<string, unknown>, context?: DocumentCloneContext): this | Promise<this>;
    }

    interface FoundryDocument {
        _source: DocumentSourceData;
    }
}

export type {};
