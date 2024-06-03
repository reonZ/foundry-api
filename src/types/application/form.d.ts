declare global {
    interface FormApplicationOptions extends ApplicationOptions {
        editable: boolean;
        closeOnSubmit: boolean;
        submitOnClose: boolean;
        submitOnChange: boolean;
    }

    interface DocumentSheetData<
        TDocument extends foundry.abstract.Document = foundry.abstract.Document
    > {
        cssClass: string;
        editable: boolean;
        document: TDocument;
        data: object;
        limited: boolean;
        options: Partial<DocumentSheetOptions>;
        owner: boolean;
        title: string;
    }

    interface FormApplicationData<O extends object = object> {
        object?: O | object;
        options?: Partial<FormApplicationOptions>;
        title?: string;
    }

    abstract class FormApplication<
        TObject extends object = object,
        TOptions extends FormApplicationOptions = FormApplicationOptions
    > extends Application<TOptions> {
        options: TOptions;

        constructor(object?: TObject, options?: Partial<TOptions>);

        static get defaultOptions(): FormApplicationOptions;

        get object(): TObject;

        abstract _updateObject(event: Event, formData: Record<string, unknown>): Promise<unknown>;

        _onChangeRange(event: { target: HTMLInputElement }): void;

        close(options?: { force?: boolean; submit?: boolean }): Promise<void>;
        submit(options?: OnSubmitFormOptions): Promise<this>;
        getData(
            options?: Partial<TOptions>
        ): FormApplicationData<TObject> | Promise<FormApplicationData<TObject>>;
    }

    interface OnSubmitFormOptions {
        updateData?: Record<string, unknown> | null;
        preventClose?: boolean;
        preventRender?: boolean;
    }
}

export type {};
