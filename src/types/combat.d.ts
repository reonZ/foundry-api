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
        initiative: number | null;
        tokenId: string;
        hidden: boolean;

        get actor(): Actor | null;
        get token(): TokenDocument;
        get isDefeated(): boolean;
        get visible(): boolean;
    }

    class Combat<TCombatant extends Combatant = Combatant> extends FoundryDocument {
        round: number;
        turn: null | number;
        turns: TCombatant[];

        get combatant(): TCombatant | undefined;
        get combatants(): EmbeddedCollection<TCombatant>;
        get started(): boolean;
        get isActive(): boolean;

        update(
            data: object,
            context?: DocumentModificationContext<this> & { direction: 1 | -1 }
        ): Promise<this | undefined>;
        rollInitiative(
            ids: string | string[],
            options?: { formula?: string | null; updateTurn?: boolean; messageOptions?: object }
        ): Promise<this>;
    }

    interface Combat {}

    class CombatTracker<TCombat extends Combat | null = Combat | null> extends SidebarTab {
        viewed: TCombat | null;

        get combats(): NonNullable<TCombat>[];

        _onCombatControl(event: Event): void;
        _onCombatantControl(event: Event): void;
        _onCombatantHoverIn(event: Event): void;
        _onCombatantHoverOut(event: Event): void;
        _onCombatantMouseDown(event: Event): void;
        _getCombatantThumbnail(combatant: Combatant): Promise<string>;
        _onConfigureCombatant(li: JQuery): void;

        scrollToTurn(): void;
        hoverCombatant(combatant: Combatant, hover: boolean): void;
    }

    class CombatTrackerConfig extends FormApplication {}
}

export type {};
