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

    interface ChatMessageSourceData extends DocumentSourceData {
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
    }

    class ChatMessage extends FoundryDocument {
        get alias(): string;
        get isAuthor(): boolean;
        get isContentVisible(): boolean;
        get isRoll(): boolean;

        static getSpeaker(options?: ChatMessageSpeakerOptions): ChatMessageSpeaker;
        static create<D extends ChatMessageSourceData = ChatMessageSourceData>(
            data: Partial<D>,
            context?: DocumentModificationContext
        ): Promise<ChatMessage>;
    }
}

export type {};
