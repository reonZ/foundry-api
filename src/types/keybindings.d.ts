declare global {
    interface KeybindingActionConfig {
        namespace?: string;
        name: string;
        hint?: string;
        uneditable?: KeybindingActionBinding[];
        editable?: KeybindingActionBinding[];
        onDown?: (context: KeyboardEventContext) => unknown;
        onUp?: (context: KeyboardEventContext) => unknown;
        repeat?: boolean;
        restricted?: boolean;
        reservedModifiers?: ModifierKey[];
        precedence?: (typeof CONST.KEYBINDING_PRECEDENCE)[keyof typeof CONST.KEYBINDING_PRECEDENCE];
        order?: number;
    }

    interface KeybindingAction {
        action: string;
        key: string;
        name: string;
        requiredModifiers?: ModifierKey[];
        optionalModifiers?: ModifierKey[];
        onDown?: (...args: unknown[]) => boolean;
        onUp?: (...args: unknown[]) => boolean;
        repeat?: boolean;
        restricted?: boolean;
        precedence?: number;
        order?: number;
    }

    interface KeyboardEventContext {
        key: string;
        event: KeyboardEvent;
        isShift: boolean;
        isControl: boolean;
        isAlt: boolean;
        hasModifiers: boolean;
        modifiers: ModifierKey[];
        up: boolean;
        repeat: boolean;
        action?: string;
    }

    interface KeybindingActionBinding {
        key: string | null;
        modifiers?: ModifierKey[];
    }

    class ClientKeybindings {
        register(namespace: string, action: string, data: KeybindingActionConfig): void;
    }
}

export type {};
