declare global {
    interface DocumentModificationContext<
        TParent extends FoundryDocument | null = FoundryDocument
    > {
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
        TType extends string | number = string | number,
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
        type: string | number;
        flags: { [k: string]: any };
        _stats: {
            compendiumSource: string | null;
        };

        static create<TDocument extends FoundryDocument>(
            data: PreCreate<TDocument["_source"]>,
            context?: DocumentModificationContext<TDocument["parent"]>
        ): Promise<FoundryDocument>;

        static fromSource(
            source: object,
            options?: { strict?: boolean; [k: string]: any }
        ): FoundryDocument;

        static deleteDocuments(
            ids: string[],
            context?: DocumentModificationContext
        ): Promise<FoundryDocument[]>;

        get id(): string;
        get name(): string;
        get isOwner(): boolean;
        get parent(): TParent;
        get uuid(): string;
        get link(): string;
        get documentName(): string;
        get sheet(): DocumentSheet;
        get permission(): (typeof CONST.DOCUMENT_OWNERSHIP_LEVELS)[keyof typeof CONST.DOCUMENT_OWNERSHIP_LEVELS];

        reset(): void;
        prepareBaseData(): void;
        updateSource<D extends Record<string, any>>(
            changes: D,
            options?: { fallback?: boolean; dryRun?: boolean }
        ): Partial<{ [K in keyof D]: D[K] }>;
        getFlag<T>(scope: string, key: string): T | undefined;
        setFlag(scope: string, key: string, value: unknown): Promise<this>;
        unsetFlag(scope: string, key: string): Promise<this>;
        update(
            data: object,
            context?: DocumentModificationContext<this>
        ): Promise<this | undefined>;
        toObject(source?: boolean): this["_source"];
        delete(context?: DocumentModificationContext): Promise<this | undefined>;

        clone(
            data: object | undefined,
            context: DocumentCloneContext & { save: true }
        ): Promise<this>;
        clone(data?: object, context?: DocumentCloneContext & { save?: false }): this;
        clone(data?: object, context?: DocumentCloneContext): this | Promise<this>;

        canUserModify(user: User, action: UserAction, data?: Record<string, unknown>): boolean;
    }

    interface FoundryDocument {
        _source: DocumentSourceData;
    }
}

export type {};
