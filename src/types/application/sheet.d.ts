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
        TObject extends FoundryDocument = FoundryDocument
    > extends FormApplication<TObject> {
        get isEditable(): boolean;

        _updateObject(event: SubmitEvent, formData: Record<string, unknown>): Promise<void>;
    }

    class ActorSheet<TActor extends Actor = Actor> extends DocumentSheet<TActor> {
        get actor(): TActor;
    }

    class ItemSheet<TItem extends Item> extends DocumentSheet<TItem> {}
}

export type {};
