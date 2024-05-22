declare global {
    type ContextOptionCondition = ($html: JQuery) => boolean;

    interface EntryContextOption {
        name: string;
        icon: string;
        condition: ContextOptionCondition;
        callback: ($html: JQuery) => void;
    }

    class SidebarTab extends Application {
        renderPopout(forced?: boolean): void;
    }
}

export type {};
