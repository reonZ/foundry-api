declare global {
    class PerceptionManager {
        static FLAGS: {
            initializeLighting: { propagate: ["refreshLighting"]; reset: [] };
            refreshLighting: { propagate: ["refreshLightSources"]; reset: [] };
            refreshLightSources: { propagate: []; reset: [] };
            refreshVisionSources: { propagate: []; reset: [] };
            refreshPrimary: { propagate: []; reset: [] };
            initializeVision: {
                propagate: [
                    "refreshVision",
                    "refreshTiles",
                    "refreshLighting",
                    "refreshLightSources",
                    "refreshPrimary"
                ];
                reset: [];
            };
            refreshVision: { propagate: ["refreshVisionSources"]; reset: [] };
            initializeSounds: { propagate: ["refreshSounds"]; reset: [] };
            refreshSounds: { propagate: []; reset: [] };
            refreshTiles: { propagate: ["refreshLightSources", "refreshVisionSources"]; reset: [] };
            soundFadeDuration: { propagate: []; reset: [] };
            forceUpdateFog: { propagate: []; reset: [] };
        };

        activate(): void;
        deactivate(): void;
        initialize(): void;
        refresh(): void;
        update(flags: { [K in keyof typeof PerceptionManager.FLAGS]?: true }, v2?: boolean): void;
    }
}

export type {};
