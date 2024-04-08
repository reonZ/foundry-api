declare global {
    type ActorSourceData<
        TType extends string = string,
        TSystem extends Record<string, any> = Record<string, any>
    > = DocumentSourceData<TType, TSystem>;

    interface ActorSheetOptions extends DocumentSheetOptions {
        token: TokenDocument | null;
    }

    class Actor extends FoundryDocument {
        type: string;

        get name(): string;
        get itemTypes(): Record<string, Item[]>;

        deleteEmbeddedDocuments(
            embeddedName: "Item",
            dataId: string[],
            context?: DocumentModificationContext<this>
        ): Promise<Item[]>;
    }

    interface Actor {
        readonly _source: ActorSourceData;
        system: { [k: string]: any };
        items: EmbeddedCollection<Item>;
        flags: ActorSourceData["flags"];
    }
}

export type {};
