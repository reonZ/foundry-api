declare global {
    interface UserSourceData extends DocumentSourceData {}

    class User extends FoundryDocument {
        get isGM(): boolean;
    }
}

export type {};
