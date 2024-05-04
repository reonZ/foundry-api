declare global {
    interface NotificationsOptions {
        permanent?: boolean;
        console?: boolean;
        localize?: boolean;
    }

    class Notifications {
        notify(message: string, type?: string, options?: NotificationsOptions): void;
        warn(message: string, options?: NotificationsOptions): void;
        info(message: string, options?: NotificationsOptions): void;
        error(message: string, options?: NotificationsOptions): void;
    }
}

export type {};
