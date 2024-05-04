declare global {
    interface Roll {
        ghost?: boolean;
    }

    interface Game {
        dice3d?: {
            showForRoll(
                roll: Roll | Rolled<Roll>,
                user?: User,
                synchronize?: boolean,
                users?: (User | string)[],
                blind?: boolean,
                messageID?: string | null,
                speaker?: ChatMessageSpeaker | null
            ): Promise<boolean>;
        };
    }
}

export type {};
