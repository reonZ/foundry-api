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
        modules: Collection<Module>;
        packs: CompendiumPacks;
        combat: Combat;
        actors: Actors;
    }

    const game: Game;
}

export type {};
