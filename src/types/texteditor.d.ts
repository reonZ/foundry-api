declare global {
    interface EnrichmentOptions {
        secrets?: boolean;
        documents?: boolean;
        links?: boolean;
        rolls?: boolean;
        rollData?: Function | object;
        async?: boolean;
        relativeTo?: FoundryDocument;
    }

    class TextEditor {
        static getDragEventData<T extends Record<string, unknown> = Record<string, unknown>>(
            event: DragEvent
        ): T | undefined;

        static enrichHTML(content: string, options?: EnrichmentOptions & { async: false }): string;
        static enrichHTML(
            content: string,
            options: EnrichmentOptions & { async: true }
        ): Promise<string>;
        static enrichHTML(content: string, options?: EnrichmentOptions): string | Promise<string>;
    }
}

export type {};
