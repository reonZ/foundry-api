declare global {
    class JournalEntryPage extends FoundryDocument {
        text: {
            content: string;
            markdown: string;
            format: (typeof CONST.JOURNAL_ENTRY_PAGE_FORMATS)[keyof typeof CONST.JOURNAL_ENTRY_PAGE_FORMATS];
        };
    }

    class JournalEntry extends FoundryDocument {
        pages: EmbeddedCollection<JournalEntryPage>;
    }
}

export type {};
