declare global {
    interface ApplicationPosition {
        top: number;
        left: number;
        width: number | "auto";
        height: number | "auto";
        zIndex: number;
        scale: number;
    }

    interface TinyMCEEditorData {
        active: boolean;
        button: HTMLElement;
        changed: boolean;
        hasButton: boolean;
        initial: string;
        // mce: TinyMCE.Editor | null;
        // options: Partial<TinyMCE.EditorOptions>;
        target: string;
    }

    class FormDataExtended extends FormData {
        constructor(
            form: HTMLElement,
            options?: { editors?: Record<string, TinyMCEEditorData>; dtypes?: string[] }
        );

        readonly object: Record<string, unknown>;

        process(form: HTMLFormElement): void;
    }

    type ApplicationFormSubmission = (
        event: SubmitEvent | Event,
        form: HTMLFormElement,
        formData: FormDataExtended
    ) => Promise<void>;

    interface ApplicationWindowConfiguration {
        frame?: boolean;
        positioned?: boolean;
        title?: string;
        icon?: string | false;
        controls?: ApplicationHeaderControlsEntry[];
        minimizable?: boolean;
        resizable?: boolean;
        contentTag?: string;
        contentClasses?: string[];
    }

    type ApplicationClickAction = (event: PointerEvent, target: HTMLElement) => Promise<void>;

    interface ApplicationFormConfiguration {
        handler: ApplicationFormSubmission;
        submitOnChange: boolean;
        closeOnSubmit: boolean;
    }

    interface ApplicationConfiguration {
        id: string;
        uniqueId: string;
        classes: string[];
        tag: string;
        window: ApplicationWindowConfiguration;
        actions: Record<
            string,
            ApplicationClickAction | { handler: ApplicationClickAction; buttons: number[] }
        >;
        position: Partial<ApplicationPosition>;
        form?: ApplicationFormConfiguration;
    }

    interface ApplicationClosingOptions {
        animate?: boolean;
        closeKey?: boolean;
    }

    type ApplicationRenderContext = Record<string, unknown>;

    interface ApplicationHeaderControlsEntry {
        icon: string;
        label: string;
        action: string;
        visible: boolean;
    }

    interface ApplicationRenderOptions<TParts extends string = string> {
        force?: boolean;
        position?: ApplicationPosition;
        window?: ApplicationWindowRenderOptions;
        parts?: TParts[];
        isFirstRender?: boolean;
    }

    interface ApplicationWindowRenderOptions {
        title: string;
        icons: string | false;
        controls: boolean;
    }

    type ApplicationV2<
        TConfig extends ApplicationConfiguration = ApplicationConfiguration,
        TRenderOptions extends ApplicationRenderOptions = ApplicationRenderOptions
    > = foundry.applications.api.ApplicationV2<TConfig, TRenderOptions>;

    namespace foundry.applications.api {
        abstract class ApplicationV2<
            TConfig extends ApplicationConfiguration = ApplicationConfiguration,
            TRenderOptions extends ApplicationRenderOptions = ApplicationRenderOptions
        > {
            constructor(options?: Partial<TConfig>);

            static BASE_APPLICATION: ApplicationV2;

            static DEFAULT_OPTIONS: Partial<ApplicationConfiguration>;

            static RENDER_STATES: {
                ERROR: -3;
                CLOSING: -2;
                CLOSED: -1;
                NONE: 0;
                RENDERING: 1;
                RENDERED: 2;
            };

            static emittedEvents: readonly string[];

            options: TConfig;
            tabGroups: Record<string, string>;
            position: ApplicationPosition;

            get window(): {
                header: HTMLElement;
                title: HTMLHeadingElement;
                icon: HTMLElement;
                close: HTMLButtonElement;
                controls: HTMLButtonElement;
                controlsDropdown: HTMLDivElement;
                onDrag: Function;
                onResize: Function;
                pointerStartPosition: ApplicationPosition;
                pointerMoveThrottle: boolean;
            };

            get classList(): DOMTokenList;
            get id(): string;
            get title(): string;
            get element(): HTMLElement | null;
            get minimized(): boolean;
            get rendered(): boolean;
            get state(): number;
            get hasFrame(): boolean;

            abstract _renderHTML(
                context: Awaited<ReturnType<this["_prepareContext"]>>,
                options: TRenderOptions
            ): Promise<unknown>;
            abstract _replaceHTML(
                result: Awaited<ReturnType<this["_renderHTML"]>>,
                content: HTMLElement,
                options: TRenderOptions
            ): void;

            _configureRenderOptions(options: TRenderOptions): void;
            _prepareContext(options: TRenderOptions): Promise<unknown>;
            _getHeaderControls(): ApplicationHeaderControlsEntry[];
            _renderFrame(options: TRenderOptions): Promise<HTMLElement>;
            _renderHeaderControl(control: ApplicationHeaderControlsEntry): HTMLLIElement;
            _updateFrame(options: TRenderOptions): void;
            _insertElement(element: HTMLElement): void;
            _removeElement(element: HTMLElement): void;
            _updatePosition(position: ApplicationPosition): ApplicationPosition;
            _canRender(options: TRenderOptions): false | void;
            _preFirstRender(
                context: ApplicationRenderContext,
                options: TRenderOptions
            ): Promise<void>;
            _onFirstRender(context: ApplicationRenderContext, options: TRenderOptions): void;
            _preRender(context: ApplicationRenderContext, options: TRenderOptions): Promise<void>;
            _onRender(context: ApplicationRenderContext, options: TRenderOptions): void;
            _preClose(options: TRenderOptions): Promise<void>;
            _onClose(options: TRenderOptions): void;
            _prePosition(position: ApplicationPosition): void;
            _onPosition(position: ApplicationPosition): void;
            _attachFrameListeners(): void;
            _onClickAction(event: PointerEvent, target: HTMLElement): void;
            _onSubmitForm(
                formConfig: ApplicationFormConfiguration,
                event: Event | SubmitEvent
            ): Promise<void>;
            _onChangeForm(formConfig: ApplicationFormConfiguration, event: Event): void;
            _awaitTransition(element: HTMLElement, timeout: number): Promise<void>;

            render(
                options?: boolean | TRenderOptions,
                _options?: TRenderOptions
            ): Promise<ApplicationV2>;
            close(options?: ApplicationClosingOptions): Promise<ApplicationV2>;
            setPosition(position?: Partial<ApplicationPosition>): ApplicationPosition;
            toggleControls(expanded?: boolean): void;
            minimize(): Promise<void>;
            maximize(): Promise<void>;
            bringToFront(): void;
            changeTab(
                tab: string,
                group: string,
                options?: {
                    event?: Event;
                    navElement?: HTMLElement;
                    force?: boolean;
                    updatePosition?: boolean;
                }
            ): void;
            parseCSSDimension(style: string, parentDimension: number): number;
        }

        function HandlebarsApplicationMixin<
            TApplication extends
                | ConstructorOf<foundry.applications.api.ApplicationV2>
                | AbstractConstructorOf<foundry.applications.api.ApplicationV2>,
            TConfig extends ApplicationConfiguration = ApplicationConfiguration,
            TRenderOptions extends ApplicationRenderOptions = ApplicationRenderOptions,
            TContext extends ApplicationRenderContext = ApplicationRenderContext
        >(
            Application: TApplication
        ): TApplication & ConstructorOf<HandlebarsApplication<TConfig, TRenderOptions, TContext>>;

        class HandlebarsApplication<
            TConfig extends ApplicationConfiguration = ApplicationConfiguration,
            TRenderOptions extends ApplicationRenderOptions = ApplicationRenderOptions,
            TContext extends ApplicationRenderContext = ApplicationRenderContext
        > {
            static PARTS: Record<string, HandlebarsTemplatePart>;

            get parts(): Record<string, HTMLElement>;

            _preparePartContext(
                partId: string,
                context: TContext,
                options: TRenderOptions
            ): Promise<ApplicationRenderContext>;
        }
    }

    interface HandlebarsTemplatePart {
        template: string;
        id?: string;
        classes?: string[];
        templates?: string[];
        scrollable?: string[];
        forms?: Record<string, ApplicationFormConfiguration>;
    }

    namespace foundry.applications {
        const instances: Map<string, api.ApplicationV2>;
    }
}

export type {};
