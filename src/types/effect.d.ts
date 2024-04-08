declare global {
    type EffectDurationData = {
        startTime: number | null;
        seconds: number | null;
        combat: FoundryDocument | null;
        rounds: number | null;
        turns: number | null;
        startRound: number | null;
        startTurn: number | null;
    };

    interface PreparedEffectDurationData extends EffectDurationData {
        type: string;
        remaining?: string;
        label?: string;
    }

    interface TemporaryEffect {
        isTemporary: boolean;
        duration: PreparedEffectDurationData;
    }

    class ActiveEffect<TParent extends Actor> extends FoundryDocument {}
}

export type {};
