declare global {
    interface GlobalConfig {
        Canvas: {
            polygonBackends: Record<WallRestrictionType, typeof ClockwiseSweepPolygon>;
            objectBorderThickness: number;
            dispositionColors: {
                HOSTILE: number;
                NEUTRAL: number;
                FRIENDLY: number;
                INACTIVE: number;
                PARTY: number;
                CONTROLLED: number;
                SECRET: number;
            };
        };
        Dice: {
            types: (typeof foundry.dice.terms.Die | typeof DiceTerm)[];
            rollModes: Record<RollMode, string>;
            rolls: ConstructorOf<Roll>[];
            termTypes: Record<
                string,
                ConstructorOf<RollTerm> & { fromData(data: object): RollTerm }
            >;
            terms: {
                c: typeof Coin;
                d: typeof foundry.dice.terms.Die;
                f: typeof FateDie;
                [key: string]: ConstructorOf<DiceTerm>;
            };
            randomUniform: Function;
        };
    }

    const CONFIG: GlobalConfig;
}

export type {};
