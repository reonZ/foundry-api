declare global {
    class TokenHUD extends Application {}
    class TileHUD extends Application {}
    class DrawingHUD extends Application {}
    class ChatBubbles extends Application {}

    class HeadsUpDisplay extends Application {
        token: TokenHUD;
        tile: TileHUD;
        drawing: DrawingHUD;
        bubbles: ChatBubbles;
        align(): void;
    }

    class BasePlaceableHUD<TObject extends PlaceableObject> extends Application {
        object: TObject | null;

        get document(): TObject["document"];
        get layer(): TObject["layer"];

        _onClickControl(event: PointerEvent): void;

        bind(object: TObject): void;
        clear(): void;
    }

    class Hotbar extends Application {
        get locked(): boolean;

        _toggleHotbarLock(): Promise<void>;
    }

    class DocumentDirectory extends SidebarTab {}

    class MacroDirectory extends DocumentDirectory {}
}

export type {};
