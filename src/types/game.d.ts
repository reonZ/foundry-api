declare global {
    class Game {
        settings: ClientSettings;
        i18n: Localization;
        user: User;
        ready: boolean;
        data: {
            userId: string;
            users: UserSourceData[];
        };
    }

    const game: Game;
}

export type {};
