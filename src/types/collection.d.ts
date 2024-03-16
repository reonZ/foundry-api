declare global {
    class Collection<T> extends Map<string, T> {}

    class DocumentCollection<T> extends Collection<T> {}

    class WorldCollection<T> extends DocumentCollection<T> {}

    class WorldSettings extends WorldCollection<Setting> {
        getSetting(key: string): Setting;
    }
}

export type {};
