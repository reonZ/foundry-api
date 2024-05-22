declare global {
    namespace ui {
        const notifications: Notifications;
        const windows: Record<string, Application>;
        const chat: ChatLog;
        const hotbar: Hotbar;
        const macros: MacroDirectory;
    }
}

export type {};
