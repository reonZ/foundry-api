declare global {
    interface ActorSheetData<TActor extends Actor> extends DocumentSheetData<TActor> {
        actor: any;
        data: any;
        items: any;
        cssClass: "editable" | "locked";
        effects: RawObject<ActiveEffect<TActor>>[];
        limited: boolean;
        options: Partial<ActorSheetOptions>;
    }

    class DocumentSheet<
        TDocument extends foundry.abstract.Document = foundry.abstract.Document,
        TOptions extends DocumentSheetOptions = DocumentSheetOptions
    > extends FormApplication<TDocument, TOptions> {
        get isEditable(): boolean;

        _updateObject(event: SubmitEvent, formData: Record<string, unknown>): Promise<void>;

        override getData(
            options?: Partial<TOptions>
        ): DocumentSheetData<TDocument> | Promise<DocumentSheetData<TDocument>>;
    }

    class ActorSheet<TActor extends Actor = Actor> extends DocumentSheet<TActor> {
        get actor(): TActor;
    }

    class ItemSheet<TItem extends Item> extends DocumentSheet<TItem> {}
}

export type {};
