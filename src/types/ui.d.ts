declare global {
    namespace ui {
        const notifications: Notifications;
        const windows: Record<string, Application>;
        const chat: ChatLog;
        const hotbar: Hotbar;
        const macros: MacroDirectory;
        const combat: CombatTracker;
    }

    interface ContextMenuEntry {
        name: string;
        icon: string;
        callback: (target: JQuery) => void;
        condition?: (target: JQuery) => boolean;
    }

    type ContextMenuCallback = (target: HTMLElement) => void;

    class ContextMenu {
        constructor(
            element: HTMLElement | JQuery,
            selector: string,
            menuItems: ContextMenuEntry[],
            {
                eventName,
                onOpen,
                onClose,
            }?: { eventName?: string; onOpen?: ContextMenuCallback; onClose?: ContextMenuCallback }
        );

        static create(
            app: Application,
            html: JQuery,
            selector: string,
            menuItems: ContextMenuEntry[],
            options?: { eventName?: string; hookName?: string }
        ): ContextMenu | void;

        bind(): void;
        close(options?: { animate?: boolean }): Promise<void>;
        render(target: JQuery, options?: { event?: Event }): Promise<void>;
    }
}

export type {};
