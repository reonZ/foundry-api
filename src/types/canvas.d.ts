declare global {
    interface CanvasDocument extends FoundryDocument {
        hidden?: boolean;
    }

    class TokenLayer extends PlaceablesLayer<Token> {
        get placeables(): Token[];
    }

    type GridType = (typeof CONST.GRID_TYPES)[keyof typeof CONST.GRID_TYPES];

    class GridHighlight extends PIXI.Graphics {
        positions: Set<string>;
    }

    class GridLayer extends CanvasLayer {
        get type(): GridType;
        get size(): number;
        get w(): number;
        get h(): number;
        get isHex(): boolean;

        getHighlightLayer(name: string): GridHighlight | undefined;
    }

    class Canvas {
        tokens: TokenLayer;
        grid: GridLayer;
        dimensions: SceneDimensions;
        perception: PerceptionManager;

        get scene(): Scene;
        get ready(): boolean;

        ping(origin: Point, options?: Record<string, unknown>): Promise<boolean>;
    }

    const canvas: Canvas;
}

export type {};
