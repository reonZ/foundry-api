declare global {
    interface BaseItem {
        type: string;
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
        get actor(): TParent;
        get img(): string;

        sortRelative({
            updateData,
            ...sortOptions
        }: { updateData?: object } & SortingOptions<this>): Promise<void>;
    }

    interface Item {
        readonly _source: ItemSourceData;
        system: { [k: string]: any };
        flags: ItemSourceData["flags"];
    }
}

export type {};
