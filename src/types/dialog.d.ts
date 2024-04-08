declare global {
    interface DialogButton<T = unknown> {
        icon?: string;
        label?: string;
        callback?: (html: JQuery) => T;
    }

    interface DialogData {
        title: string;
        content: string;
        buttons: Record<string, DialogButton>;
        default?: string;
        render?: (html: JQuery) => void;
        close?: (html: JQuery) => unknown;
    }

    interface DialogPromptConfig<R = unknown> {
        title?: string;
        content: string;
        label?: string;
        callback?: (html: JQuery) => R;
        render?: (html: JQuery) => unknown;
        rejectClose?: boolean;
        options?: ApplicationOptions;
    }

    interface DialogConfirmConfig<Y, N> {
        title?: string;
        content?: string;
        yes?: DialogButton<Y>;
        no?: DialogButton<N>;
        render?: (html: JQuery) => unknown;
        defaultYes?: boolean;
        rejectClose?: boolean;
        options?: ApplicationOptions;
    }

    class Dialog extends FormApplication {
        static confirm<Y = true, N = false>(
            config?: DialogConfirmConfig<Y, N>
        ): Promise<Y | N | null>;
        static prompt<R = unknown>(config?: DialogPromptConfig): Promise<R>;
        static wait<R = unknown>(
            data?: DialogData,
            options?: ApplicationOptions,
            renderOptions?: ApplicationRenderOptions
        ): Promise<R>;
    }
}

export type {};
