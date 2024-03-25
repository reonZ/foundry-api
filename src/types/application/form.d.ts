declare global {
    class FormApplication<
        TFormData extends Record<string, unknown> = Record<string, unknown>
    > extends Application {
        _onChangeRange(event: { target: HTMLInputElement }): void;
        _updateObject(event: SubmitEvent, formData: TFormData): Promise<void>;
        close(options?: { force?: boolean; submit?: boolean }): Promise<void>;
    }
}

export type {};
