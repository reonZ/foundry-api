declare global {
    interface UserActivity {
        cursor?: object;
        focus?: boolean;
        ping?: boolean;
        ruler?: string;
        sceneId?: string;
        targets?: string[];
    }

    type UserRole = keyof typeof CONST.USER_ROLE_NAMES;

    interface UserPermission {
        label: string;
        hint: string;
        disableGM: boolean;
        defaultRole: UserRole;
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
        hasPermission(permission: string): boolean;
    }
}

export type {};
