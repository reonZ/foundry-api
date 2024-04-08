declare global {
    interface GlobalConfig {}

    interface GlobalConst {
        CHAT_MESSAGE_TYPES: {
            OTHER: 0;
            OOC: 1;
            IC: 2;
            EMOTE: 3;
            WHISPER: 4;
            ROLL: 5;
        };
    }

    const CONFIG: GlobalConfig;
    const CONST: GlobalConst;
}

export type {};
