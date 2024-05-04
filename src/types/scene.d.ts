declare global {
    interface SceneDimensions {
        width: number;
        height: number;
        size: number;
        rect: PIXI.Rectangle;
        sceneX: number;
        sceneY: number;
        sceneWidth: number;
        sceneHeight: number;
        sceneRect: PIXI.Rectangle;
        distance: number;
        ratio: number;
        maxR: number;
    }

    class Scene extends FoundryDocument {
        tokens: EmbeddedCollection<TokenDocument>;
        templates: EmbeddedCollection<MeasuredTemplateDocument>;

        get isView(): boolean;
    }
}

export type {};
