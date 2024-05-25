declare global {
    type TokenDisposition =
        (typeof CONST.TOKEN_DISPOSITIONS)[keyof typeof CONST.TOKEN_DISPOSITIONS];

    type TokenDocumentSource = {
        x: number;
        y: number;
    };

    class TokenDocument extends FoundryDocument {
        actorLink: boolean;
        x: number;
        y: number;
        width: number;
        height: number;
        hidden: boolean;
        disposition: TokenDisposition;
        texture: {
            src: string;
            anchorX: number;
            anchorY: number;
            offsetX: number;
            offsetY: number;
            fit: string;
            scaleX: number;
            scaleY: number;
            rotation: number;
            tint: string;
            alphaThreshold: number;
        };

        get id(): string;
        get sort(): number;
        get actor(): Actor | null;
        get object(): Token | null;
        get isLinked(): boolean;
        get combatant(): Combatant | null;
        get inCombat(): boolean;
        get center(): Point;
        get layer(): TokenLayer;
    }

    class Token<TActor extends Actor | null = Actor | null> extends PlaceableObject {
        document: TokenDocument;
        renderFlags: RenderFlags;

        get id(): string;
        get actor(): TActor;
        get center(): PIXI.Point;
        get bounds(): PIXI.Rectangle;

        _refreshVisibility(): void;
    }

    interface Token {
        get combatant(): Combatant | null;
    }

    class PrototypeToken extends FoundryDocument {
        actorLink: boolean;
    }
}

export type {};
