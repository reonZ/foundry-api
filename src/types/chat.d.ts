declare global {
    interface ChatMessageSpeakerOptions {
        scene?: Scene;
        actor?: Actor;
        token?: TokenDocument;
        alias?: string;
    }

    interface ChatMessageSpeaker {
        scene?: string;
        actor?: string;
        token?: string;
        alias?: string;
    }

    interface ChatMessageOptions {
        content: string;
        speaker?: ChatMessageSpeaker;
    }

    type ChatMessageType = (typeof CONST.CHAT_MESSAGE_TYPES)[keyof typeof CONST.CHAT_MESSAGE_TYPES];

    interface ChatMessageSourceData extends DocumentSourceData {
        user: string;
        timestamp: number;
        flavor: string;
        content: string;
        speaker: ChatMessageSpeaker;
        whisper: string[];
        blind: boolean;
        rolls: Roll[];
        sound: string;
        emote: boolean;
        flags: Record<string, any>;
        type: ChatMessageType;
        rollMode: (typeof CONST.DICE_ROLL_MODES)[keyof typeof CONST.DICE_ROLL_MODES];
    }

    interface MessageConstructionContext extends DocumentConstructionContext<null> {
        rollMode?: RollMode | "roll";
    }

    type ChatMessageCreateData = DeepPartial<Omit<ChatMessageSourceData, "rolls">> & {
        rolls?: (string | RollJSON)[];
    };

    class ChatMessage extends FoundryDocument {
        static get implementation(): typeof ChatMessage;

        blind: boolean;
        flavor: string;
        speaker: ChatMessageSpeaker;
        content: string;
        whisper: string[];

        get alias(): string;
        get isAuthor(): boolean;
        get isContentVisible(): boolean;
        get isRoll(): boolean;

        static getSpeaker(options?: ChatMessageSpeakerOptions): ChatMessageSpeaker;
        static create(
            data:
                | ChatMessageCreateData
                | PreCreate<ChatMessageSourceData>
                | Partial<ChatMessageSourceData>,
            context?: MessageConstructionContext
        ): Promise<ChatMessage>;
        static createDocuments(
            data: (ChatMessageCreateData | PreCreate<ChatMessageSourceData>)[],
            context?: MessageConstructionContext
        ): Promise<ChatMessage[]>;

        getHTML(): Promise<JQuery>;
        toObject(): ChatMessageSourceData;
        updateSource<D extends Record<string, any>>(
            changes: D,
            options?: { fallback?: boolean; dryRun?: boolean }
        ): Partial<{ [K in keyof D]: D[K] }>;
    }

    interface ChatMessage {
        _source: ChatMessageSourceData;
        type: (typeof CONST.CHAT_MESSAGE_TYPES)[keyof typeof CONST.CHAT_MESSAGE_TYPES];
    }

    class ChatLog extends SidebarTab {
        scrollBottom(options?: {
            popout?: boolean;
            waitImages?: boolean;
            scrollOptions?: ScrollIntoViewOptions;
        }): Promise<void>;
    }
}

export type {};
