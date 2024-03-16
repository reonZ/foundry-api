declare global {
    type ApplicationPositionOptions = {
        left?: number;
        top?: number;
        width?: number;
        height?: number;
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
        dragSelector: string;
        dropSelector: string;
        permissions: Object;
        callbacks: Object;
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

    class Application {
        constructor(options?: ApplicationOptions);
        static defaultOptions(): ApplicationOptions;
        get id(): string;
        get title(): string;
        get template(): string;
        get element(): JQuery;
        getData(options?: any): Record<string, unknown> | Promise<Record<string, unknown>>;
        render(force?: boolean, options?: ApplicationRenderOptions): this;
        close(options?: any): Promise<void>;
        activateListeners(html: JQuery): void;
    }
}

export type {};
