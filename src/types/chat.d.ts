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

    type ChatMessageType =
        (typeof CONST.CHAT_MESSAGE_STYLES)[keyof typeof CONST.CHAT_MESSAGE_STYLES];

    interface ChatMessageSourceData extends DocumentSourceData {
        author: string;
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

        getHTML(): Promise<JQuery>;
        toObject(): ChatMessageSourceData;
        updateSource<D extends Record<string, any>>(
            changes: D,
            options?: { fallback?: boolean; dryRun?: boolean }
        ): Partial<{ [K in keyof D]: D[K] }>;
    }

    interface ChatMessageModificationContext extends DocumentModificationContext<null> {
        rollMode?: RollMode | "roll";
    }

    namespace ChatMessage {
        function create<TDocument extends ChatMessage>(
            this: ConstructorOf<TDocument>,
            data: DeepPartial<
                Omit<TDocument["_source"], "rolls"> & { rolls: (string | RollJSON)[] }
            >[],
            context?: ChatMessageModificationContext
        ): Promise<TDocument[]>;
        function create<T extends ChatMessage>(
            this: ConstructorOf<T>,
            data: DeepPartial<Omit<T["_source"], "rolls"> & { rolls: (string | RollJSON)[] }>,
            context?: ChatMessageModificationContext
        ): Promise<T | undefined>;
        function create<T extends ChatMessage>(
            this: ConstructorOf<T>,
            data:
                | DeepPartial<Omit<T["_source"], "rolls"> & { rolls: (string | RollJSON)[] }>[]
                | DeepPartial<Omit<T["_source"], "rolls"> & { rolls: (string | RollJSON)[] }>,
            context?: ChatMessageModificationContext
        ): Promise<T[] | T | undefined>;
    }

    interface ChatMessage {
        _source: ChatMessageSourceData;
        type: (typeof CONST.CHAT_MESSAGE_STYLES)[keyof typeof CONST.CHAT_MESSAGE_STYLES];
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
