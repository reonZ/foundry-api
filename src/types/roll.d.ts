declare global {
    interface RollOptions {
        flavor?: string;
        [key: string]: JSONValue;
    }

    interface RollTermData {
        class?: string;
        options?: RollOptions;
        evaluated?: boolean;
    }

    type Rolled<T extends Roll> = T & {
        readonly result: string;
        readonly total: number;
        _evaluated: true;
        terms: RollTerm[];
    };

    interface DiceTermResult {
        result: number;
        active?: boolean;
        count?: number;
        success?: boolean;
        failure?: boolean;
        discarded?: boolean;
        rerolled?: boolean;
        exploded?: boolean;
    }

    interface DiceTermData extends RollTermData {
        number?: number;
        faces?: number;
        modifiers?: string[];
        results?: DiceTermResult[];
    }

    interface EvaluateRollParams {
        minimize?: boolean;
        maximize?: boolean;
        async?: boolean;
    }

    abstract class RollTerm<TTermData extends RollTermData = RollTermData> {}

    abstract class DiceTerm<TData extends DiceTermData = DiceTermData> extends RollTerm<TData> {}

    class Roll {
        constructor(formula: string, data?: Record<string, unknown>, options?: RollOptions);

        get dice(): DiceTerm[];
        get formula(): string;
        get result(): string;
        get total(): number | undefined;
        get isDeterministic(): boolean;

        evaluate({
            minimize,
            maximize,
            async,
        }: EvaluateRollParams & { async?: false }): Rolled<this>;
        evaluate({
            minimize,
            maximize,
            async,
        }?: EvaluateRollParams & { async: true }): Promise<Rolled<this>>;
        evaluate({
            minimize,
            maximize,
            async,
        }?: EvaluateRollParams): Rolled<this> | Promise<Rolled<this>>;
    }
}

export type {};
