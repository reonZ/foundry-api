declare global {
    interface RollOptions {
        flavor?: string;
        [key: string]: JSONValue;
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

    interface RollJSON {
        class: string;
        options: Record<string, unknown>;
        data?: RollOptions;
        dice: DiceTerm[];
        formula: string;
        terms: RollTermData[];
        total?: number;
        evaluated: boolean;
    }

    class NumericTerm<TData extends NumericTermData = NumericTermData> extends RollTerm<TData> {
        constructor({ number, options }: NumericTermData);

        number: number;

        static REGEXP: RegExp;
        static SERIALIZE_ATTRIBUTES: ["number"];

        get expression(): string;
        get total(): number;

        static matchTerm(expression: string): RegExpMatchArray | null;
        static fromMatch<T extends NumericTerm<NumericTermData>>(
            this: T,
            match: RegExpMatchArray
        ): T;
    }

    class Die<TData extends DieData = DieData> extends DiceTerm<TData> {
        constructor(termData?: Partial<DieData>);

        static DENOMINATION: string;
        static MODIFIERS: {
            r: "reroll";
            rr: "rerollRecursive";
            x: "explode";
            xo: "explodeOnce";
            k: "keep";
            kh: "keep";
            kl: "keep";
            d: "drop";
            dh: "drop";
            dl: "drop";
            min: "minimum";
            max: "maximum";
            even: "countEven";
            odd: "countOdd";
            cs: "countSuccess";
            cf: "countFailures";
            df: "deductFailures";
            sf: "subtractFailures";
            ms: "marginSuccess";
        };

        reroll(modifier: string, { recursive }?: { recursive?: boolean }): boolean | void;
        rerollRecursive(modifier: string): boolean | void;
        explode(modifier: string, { recursive }?: { recursive?: boolean }): void;
        explodeOnce(modifier: string): void;
        keep(modifier: string): void;
        drop(modifier: string): void;
        countSuccess(modifier: string): void;
        countFailures(modifier: string): void;
        countEven(modifier: string): void;
        countOdd(modifier: string): void;
        deductFailures(modifier: string): void;
        subtractFailures(modifier: string): void;
        marginSuccess(modifier: string): void;
        minimum(modifier: string): void;
        maximum(modifier: string): void;
    }

    interface DieData extends DiceTermData {
        number: number;
        faces: number;
        marginSuccess?: boolean;
        marginFailure?: boolean;
    }

    interface NumericTermData extends RollTermData {
        class?: "NumericTerm";
        number: number;
    }

    interface RollTermData {
        class?: string;
        options?: RollOptions;
        evaluated?: boolean;
    }

    abstract class RollTerm<TTermData extends RollTermData = RollTermData> {
        get total(): number | string | undefined;
        get expression(): string;
    }

    abstract class DiceTerm<TData extends DiceTermData = DiceTermData> extends RollTerm<TData> {
        faces: TData["faces"];

        get total(): number | undefined;
    }

    class Roll {
        constructor(formula: string, data?: Record<string, unknown>, options?: RollOptions);

        get dice(): DiceTerm[];
        get formula(): string;
        get result(): string;
        get total(): number | undefined;
        get isDeterministic(): boolean;

        static fromData<T extends Roll>(data: RollJSON): T;
        static fromJSON<T extends Roll>(json: string): T;

        alter(
            multiply: number,
            add: number,
            { multiplyNumeric }?: { multiplyNumeric?: boolean }
        ): this;

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

        toMessage(
            messageData: PreCreate<ChatMessageSourceData> | undefined,
            { rollMode, create }: { rollMode?: RollMode | "roll"; create: false }
        ): Promise<ChatMessageSourceData>;
        toMessage(
            messageData?: PreCreate<ChatMessageSourceData>,
            { rollMode, create }?: { rollMode?: RollMode | "roll"; create?: true }
        ): Promise<ChatMessage>;
        toMessage(
            messageData?: PreCreate<ChatMessageSourceData>,
            { rollMode, create }?: { rollMode?: RollMode | "roll"; create?: boolean }
        ): Promise<ChatMessage | ChatMessageSourceData>;

        clone(): this;
        toJSON(): RollJSON;
    }

    interface Roll {
        options: RollOptions;
    }

    interface CoinData extends DiceTermData {
        faces: 2;
    }

    class Coin extends DiceTerm<CoinData> {}

    class FateDie extends DiceTerm {}

    interface FateDie extends DiceTerm {
        faces: 3;
    }
}

export type {};
