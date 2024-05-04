declare global {
    interface RollTableDraw {
        roll: Roll;
        results: TableResult[];
    }

    class TableResult extends FoundryDocument {
        drawn: boolean;
        text: string;
        documentCollection: string | undefined;
        documentId: string | null;
    }

    interface TableResult {
        type: (typeof CONST.TABLE_RESULT_TYPES)[keyof typeof CONST.TABLE_RESULT_TYPES];
    }

    class RollTable extends FoundryDocument {
        formula: string;
        results: EmbeddedCollection<TableResult>;
        replacement: boolean;

        get compendium(): CompendiumCollection<RollTable> | undefined;

        normalize(): Promise<this>;
        roll(): Promise<{}>;
        resetResults(): Promise<this>;
        draw(options?: {
            roll?: Roll;
            recursive?: boolean;
            results?: TableResult[];
            displayChat?: boolean;
            rollMode?: RollMode;
        }): Promise<RollTableDraw>;

        updateEmbeddedDocuments(
            embeddedName: "TableResult",
            data: DeepPartial<TableResult>[]
        ): Promise<TableResult[]>;
    }
}

export type {};
