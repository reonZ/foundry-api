declare global {
    type SocketCallback<T = any> = (packet: T, senderId: string) => void;

    class GameTime {
        get worldTime(): number;
    }

    class Game {
        userId: string;
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
        socket: {
            on: <T extends object = object>(
                context: `module.${string}`,
                callback: SocketCallback<T>
            ) => void;
            off: <T extends object = object>(
                context: `module.${string}`,
                callback: SocketCallback<T>
            ) => void;
            emit: <T extends object = object>(context: `module.${string}`, packet: T) => void;
        };
        users: Users;
        tables: RollTables;
        scenes: Scenes;
        time: GameTime;
        messages: Messages;
        macros: Macros;
        keybindings: ClientKeybindings;
        keyboard: KeyboardManager;
        tooltip: TooltipManager;

        get activeTool(): string;
    }

    const game: Game;
}

export type {};
