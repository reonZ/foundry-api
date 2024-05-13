declare global {
    type ActorSourceData<
        TType extends string = string,
        TSystem extends Record<string, any> = Record<string, any>
    > = DocumentSourceData<TType, TSystem>;

    interface ActorSheetOptions extends DocumentSheetOptions {
        token: TokenDocument | null;
    }

    class Actor extends FoundryDocument {
        static implementation: typeof Actor;

        type: string;
        pack: string | null;
        prototypeToken: PrototypeToken;
        apps: Record<number, Application>;

        get name(): string;
        get itemTypes(): Record<string, Item[]>;
        get hasPlayerOwner(): boolean;
        get isToken(): boolean;
        get token(): TokenDocument | null;

        render(force?: boolean, context?: RenderOptions): void;

        deleteEmbeddedDocuments(
            embeddedName: "Item",
            dataId: string[],
            context?: DocumentModificationContext<this>
        ): Promise<Item[]>;

        testUserPermission(
            user: User,
            permission:
                | keyof typeof CONST.DOCUMENT_OWNERSHIP_LEVELS
                | (typeof CONST.DOCUMENT_OWNERSHIP_LEVELS)[keyof typeof CONST.DOCUMENT_OWNERSHIP_LEVELS],
            options?: { exact?: boolean }
        ): boolean;

        getActiveTokens(linked: boolean | undefined, document: true): TokenDocument[];
        getActiveTokens(linked?: boolean | undefined, document?: false): Token[];
        getActiveTokens(linked?: boolean, document?: boolean): TokenDocument[] | Token[];

        getDependentTokens(options?: {
            scenes?: Scene | Scene[];
            linked?: boolean;
        }): TokenDocument[];
    }

    interface Actor {
        readonly _source: ActorSourceData;
        system: { [k: string]: any };
        items: EmbeddedCollection<Item>;
        flags: ActorSourceData["flags"];
    }
}

export type {};
