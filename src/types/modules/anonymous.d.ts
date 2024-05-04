declare global {
    class AnonymousModule extends Module {
        api: {
            playersSeeName: (actor: Actor | Combatant) => boolean;
            getName: (actor: Actor | Combatant) => string;
            toggleSeeName: (actor: Actor | Combatant) => void;
        };
    }
}

export type {};
