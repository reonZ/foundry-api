declare global {
    interface UserSourceData extends DocumentSourceData {}

    class User extends FoundryDocument {}
}

export type {};
