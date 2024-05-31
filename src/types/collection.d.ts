declare global {
    class Collection<V> {}

    interface Collection<V>
        extends Omit<Map<string, V>, "forEach" | "delete" | "set" | SymbolConstructor["iterator"]> {
        [Symbol.iterator](): IterableIterator<V>;

        get contents(): V[];

        get<T extends V = V>(key: Maybe<string>, { strict }: { strict: true }): T;
        get<T extends V = V>(key: string, { strict }?: { strict?: boolean }): T | undefined;

        set(key: string, value: V): this;
        delete(key: string): boolean;
        find<T extends V = V>(condition: (value: V) => boolean): T | undefined;
        filter<T extends V = V>(condition: (value: V) => value is T): T[];
        filter<T extends V = V>(condition: (value: V) => boolean): T[];
        forEach(fn: (value: V) => void): void;

        getName(name: string, { strict }?: { strict?: boolean }): V | undefined;
        map<T>(transformer: (value: V, index: number, collection: this) => T): T[];
        reduce<T>(evaluator: (accumlator: T, value: V) => T, initial: T): T;
        some(condition: (value: V) => boolean): boolean;
        getDocument(key: string): Promise<V | undefined>;
    }

    interface CompendiumCollectionIndex {
        img: string;
        name: string;
        type: string;
        uuid: string;
        _id: string;
    }

    interface CompendiumIndexData {
        _id: string;
        type: string;
        name: string;
        img: string;
        uuid: string;
        [key: string]: any;
    }

    interface CompendiumCollection<T extends FoundryDocument = FoundryDocument>
        extends Collection<T> {
        get collection(): string;
        index: Collection<CompendiumCollectionIndex>;
    }

    interface CompendiumPacks extends Collection<CompendiumCollection> {}

    interface EmbeddedCollection<T extends FoundryDocument = FoundryDocument>
        extends Collection<T> {}

    interface DocumentCollection<T extends FoundryDocument = FoundryDocument>
        extends Collection<T> {}

    interface WorldCollection<T extends FoundryDocument = FoundryDocument>
        extends DocumentCollection<T> {}

    interface WorldSettings extends WorldCollection<Setting> {
        getSetting(key: string): Setting;
    }

    interface Users extends WorldCollection<User> {
        get activeGM(): User | null;
    }

    interface Actors<TParent extends Actor = Actor> extends WorldCollection<TParent> {}

    interface RollTables extends WorldCollection<RollTable> {}

    interface Scenes extends WorldCollection<Scene> {}

    interface Messages extends WorldCollection<ChatMessage> {}

    interface Macros extends WorldCollection<Macro> {}
}

export type {};
