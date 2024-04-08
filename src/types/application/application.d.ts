declare global {
    type ApplicationPositionOptions = {
        left?: number;
        top?: number;
        width?: number;
        height?: number | "auto";
        scale?: number;
    };

    type ApplicationRenderOptions = ApplicationPositionOptions & {
        focus?: boolean;
        renderContext?: string;
        renderData?: Record<string, unknown>;
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

    class Application {
        constructor(options?: ApplicationOptions);

        static defaultOptions(): ApplicationOptions;
        static RENDER_STATES: {
            CLOSING: -2;
            CLOSED: -1;
            NONE: 0;
            RENDERING: 1;
            RENDERED: 2;
            ERROR: 3;
        };

        _state: (typeof Application.RENDER_STATES)[keyof typeof Application.RENDER_STATES];
        _dragDrop: DragDrop[];

        get id(): string;
        get title(): string;
        get template(): string;
        get element(): JQuery;

        _render(force?: boolean, options?: Partial<ApplicationOptions>): Promise<void>;
        _canDragDrop(selector: string): boolean;
        _onDrop(event: DragEvent): void;
        _createDragDropHandlers(): DragDrop[];
        _getHeaderButtons(): ApplicationHeaderButton[];

        getData(options?: object): Promisable<Record<string, unknown>>;
        render(force?: boolean, options?: ApplicationRenderOptions): this;
        close(options?: { force?: boolean }): Promisable<void>;
        activateListeners(html: JQuery): Promisable<void>;
        bringToTop(): void;
        setPosition(options?: ApplicationPositionOptions): Required<ApplicationPositionOptions>;
    }
}

export type {};
