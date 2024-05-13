declare global {
    interface UserActivity {
        cursor?: object;
        focus?: boolean;
        ping?: boolean;
        ruler?: string;
        sceneId?: string;
        targets?: string[];
    }

    interface UserSourceData extends DocumentSourceData {}

    class User extends FoundryDocument {
        active: boolean;
        targets: Set<Token>;
        color: string;

        get character(): Actor | null;
        get isGM(): boolean;
        get role(): (typeof CONST.USER_ROLES)[keyof typeof CONST.USER_ROLES];

        updateTokenTargets(targetIds?: string[]): void;
        broadcastActivity(activityData?: UserActivity): void;
    }
}

export type {};
