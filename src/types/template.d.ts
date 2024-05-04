declare global {
    class MeasuredTemplate {
        get highlightId(): string;
        get center(): PIXI.Point;
    }

    class MeasuredTemplateDocument extends FoundryDocument {
        get object(): MeasuredTemplate | null;
    }
}

export type {};
