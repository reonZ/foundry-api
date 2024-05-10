declare global {
    interface BaseItem {
        type: string;
    }

    interface ItemSheetData<TItem extends Item> extends DocumentSheetData<TItem> {
        item: TItem;
        data: object;
    }

    type ItemSourceData<
        TType extends string = string,
        TSystem extends Record<string, any> = Record<string, any>
    > = DocumentSourceData<TType, TSystem> & {
        type: TType;
        img: string;
        sort: number;
    };

    interface SortingOptions<T extends object = object> {
        target?: T;
        siblings?: T[];
        sortKey?: string;
        sortBefore?: boolean;
    }

    class Item<TParent extends Actor = Actor> extends FoundryDocument<TParent> {
        static get implementation(): typeof Item;

        get actor(): TParent;
        get img(): string;

        sortRelative({
            updateData,
            ...sortOptions
        }: { updateData?: object } & SortingOptions<this>): Promise<void>;

        toAnchor(options?: {
            attrs?: Record<string, string>;
            dataset?: Record<string, string>;
            classes?: string[];
            name?: string;
            icon?: string;
        }): HTMLAnchorElement;

        static fromDropData<TDocument extends foundry.abstract.Document>(
            this: ConstructorOf<TDocument>,
            data: object,
            options?: Record<string, unknown>
        ): Promise<TDocument | undefined>;
    }

    interface Item {
        readonly _source: ItemSourceData;
        system: { [k: string]: any };
        flags: ItemSourceData["flags"];
    }
}

export type {};
