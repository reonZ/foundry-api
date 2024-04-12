declare global {
    interface ChatMessageSpeakerOptions {
        scene?: Scene;
        actor?: Actor;
        token?: Token;
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

    interface ChatMessageSourceData {
        user: User;
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
    }

    class ChatMessage {
        static get implementation(): typeof ChatMessage;

        get alias(): string;
        get isAuthor(): boolean;
        get isContentVisible(): boolean;
        get isRoll(): boolean;

        static getSpeaker(options?: ChatMessageSpeakerOptions): ChatMessageSpeaker;
        static create(
            data: Partial<ChatMessageSourceData>,
            context?: DocumentModificationContext
        ): Promise<ChatMessage>;

        toObject(): Omit<ChatMessageSourceData, "type">;
        updateSource<D extends Record<string, any>>(
            changes: D,
            options?: { fallback?: boolean; dryRun?: boolean }
        ): Partial<{ [K in keyof D]: D[K] }>;
    }
}

export type {};
