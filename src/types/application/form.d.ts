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

    abstract class FormApplication<
        TObject extends object | null = null,
        TFormData extends Record<string, unknown> = Record<string, unknown>
    > extends Application {
        static get defaultOptions(): FormApplicationOptions;

        get object(): TObject;

        abstract _updateObject(event: SubmitEvent, formData: TFormData): Promise<void>;

        _onChangeRange(event: { target: HTMLInputElement }): void;
        close(options?: { force?: boolean; submit?: boolean }): Promise<void>;
    }
}

export type {};
