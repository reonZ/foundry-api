declare global {
    type TooltipDirection = keyof (typeof TooltipManager)["TOOLTIP_DIRECTIONS"];

    interface TooltipActivationOptions {
        text?: string;
        direction?: TooltipDirection;
        cssClass?: string;
        locked?: boolean;
        content?: HTMLElement;
    }

    class TooltipManager {
        tooltip: HTMLElement;
        element: HTMLElement | null;

        static TOOLTIP_MARGIN_PX: number;
        static TOOLTIP_ACTIVATION_MS: number;
        static TOOLTIP_DIRECTIONS: {
            UP: "UP";
            DOWN: "DOWN";
            LEFT: "LEFT";
            RIGHT: "RIGHT";
            CENTER: "CENTER";
        };
        static LOCKED_TOOLTIP_BUFFER_PX: number;

        activate(element: HTMLElement, options?: TooltipActivationOptions): void;
        deactivate(): void;
        dismissLockedTooltip(element: HTMLElement): void;
        dismissLockedTooltips(): void;
    }
}

export type {};
