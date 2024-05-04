declare global {
    type CombatSource = DocumentSourceData & {
        scene: string;
        // combatants: CombatantSource[];
        active: boolean;
        round: number;
        turn: number | null;
        sort: number;
    };

    type CombatantSource = DocumentSourceData & {
        actorId: string;
        tokenId: string;
        sceneId: string;
        img: string;
        initiative: number;
        hidden: boolean;
        defeated: boolean;
    };

    class Combatant extends FoundryDocument {
        static get implementation(): typeof Combatant;

        constructor(
            data: DeepPartial<CombatantSource>,
            context?: DocumentConstructionContext<Combat>
        );

        sceneId: string;
        initiative: number;

        get actor(): Actor | null;
        get token(): TokenDocument;
    }

    class Combat extends FoundryDocument {
        round: number;
        turn: null | number;

        get combatant(): Combatant | undefined;
    }

    interface Combat {
        readonly combatants: EmbeddedCollection<Combatant>;
    }
}

export type {};
