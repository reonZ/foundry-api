declare global {
    interface GlobalConst {
        CHAT_MESSAGE_TYPES: {
            OTHER: 0;
            OOC: 1;
            IC: 2;
            EMOTE: 3;
            WHISPER: 4;
            ROLL: 5;
        };
        USER_ROLES: {
            NONE: 0;
            PLAYER: 1;
            TRUSTED: 2;
            ASSISTANT: 3;
            GAMEMASTER: 4;
        };
        TABLE_RESULT_TYPES: {
            TEXT: 0;
            DOCUMENT: 1;
            COMPENDIUM: 2;
        };
        JOURNAL_ENTRY_PAGE_FORMATS: {
            HTML: 1;
            MARKDOWN: 2;
        };
        DICE_ROLL_MODES: {
            PUBLIC: "publicroll";
            PRIVATE: "gmroll";
            BLIND: "blindroll";
            SELF: "selfroll";
        };
        DOCUMENT_OWNERSHIP_LEVELS: {
            INHERIT: -1;
            NONE: 0;
            LIMITED: 1;
            OBSERVER: 2;
            OWNER: 3;
        };
        DOCUMENT_PERMISSION_LEVELS: {
            INHERIT: -1;
            NONE: 0;
            LIMITED: 1;
            OBSERVER: 2;
            OWNER: 3;
        };
        GRID_TYPES: {
            GRIDLESS: 0;
            SQUARE: 1;
            HEXODDR: 2;
            HEXEVENR: 3;
            HEXODDQ: 4;
            HEXEVENQ: 5;
        };
    }

    const CONST: GlobalConst;

    type UserAction = "delete" | "update" | "create";
}

export type {};
