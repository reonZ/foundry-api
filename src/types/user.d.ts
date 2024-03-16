declare global {
    interface UserSourceData extends DocumentSourceData {}

    class User extends FoundryDocument<UserSourceData> {}
}

export type {};
