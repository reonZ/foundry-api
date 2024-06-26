declare global {
    type ApplicationPositionOptions = {
        left?: number;
        top?: number;
        width?: number | "auto";
        height?: number | "auto";
        scale?: number;
        zIndex?: number;
    };

    type TabsConfiguration = {
        group: string;
        navSelector: string;
        contentSelector: string;
        initial: string;
        callback: Function;
    };

    type DragDropConfiguration = {
        dragSelector?: string;
        dropSelector?: string;
        permissions?: Object;
        callbacks?: Object;
    };

    type SearchFilterConfiguration = {
        options: {
            inputSelector: string;
            contentSelector: string;
            callback: Function;
            initial: string;
            delay: number;
        };
    };

    type ApplicationHeaderButton = {
        label: string;
        class: string;
        icon: string;
        onclick: (event: JQuery.ClickEvent) => Promisable<void>;
    };

    interface ApplicationOptions extends ApplicationPositionOptions {
        baseApplication?: string;
        popOut?: boolean;
        minimizable?: boolean;
        resizable?: boolean;
        id?: string;
        classes?: string[];
        title?: string;
        template?: string;
        scrollY?: string[];
        tabs?: TabsConfiguration[];
        dragDrop?: DragDropConfiguration[];
        filters?: SearchFilterConfiguration[];
    }

    interface DocumentSheetOptions extends FormApplicationOptions {
        classes: string[];
        template: string;
        viewPermission: number;
        sheetConfig: boolean;
    }

    interface RenderOptions extends Partial<ApplicationOptions> {
        left?: number;
        top?: number;
        width?: number | "auto";
        height?: number | "auto";
        scale?: number;
        focus?: boolean;
        renderContext?: string;
        renderData?: Record<string, unknown>;
        action?: UserAction;
        editable?: boolean;
    }

    class Application<TOptions extends ApplicationOptions = ApplicationOptions> {
        constructor(options?: ApplicationOptions);

        appId: number;
        position: ApplicationPositionOptions;

        static RENDER_STATES: {
            CLOSING: -2;
            CLOSED: -1;
            NONE: 0;
            RENDERING: 1;
            RENDERED: 2;
            ERROR: 3;
        };

        static get defaultOptions(): ApplicationOptions;

        _state: (typeof Application.RENDER_STATES)[keyof typeof Application.RENDER_STATES];
        _dragDrop: DragDrop[];

        get id(): string;
        get title(): string;
        get template(): string;
        get element(): JQuery;
        get rendered(): boolean;

        _render(force?: boolean, options?: Partial<ApplicationOptions>): Promise<void>;
        _renderInner(data: object, options: RenderOptions): Promise<JQuery>;
        _canDragDrop(selector: string): boolean;
        _onDrop(event: DragEvent): void;
        _createDragDropHandlers(): DragDrop[];
        _getHeaderButtons(): ApplicationHeaderButton[];

        activateTab(tabName: string, options?: { group?: string; triggerCallback?: boolean }): void;
        getData(options?: Partial<ApplicationOptions>): object | Promise<object>;
        render(force?: boolean, options?: RenderOptions): this;
        close(options?: { force?: boolean }): Promisable<void>;
        activateListeners(html: JQuery): Promisable<void>;
        bringToTop(): void;
        setPosition(options?: ApplicationPositionOptions): ApplicationPositionOptions;
    }
}

export type {};
