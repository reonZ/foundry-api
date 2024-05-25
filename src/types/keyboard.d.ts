declare global {
    type ModifierKey =
        (typeof KeyboardManager)["MODIFIER_KEYS"][keyof (typeof KeyboardManager)["MODIFIER_KEYS"]];

    class KeyboardManager {
        static MODIFIER_KEYS: {
            CONTROL: "Control";
            SHIFT: "Shift";
            ALT: "Alt";
        };
        static MODIFIER_CODES: {
            Alt: ["AltLeft", "AltRight"];
            Control: ["ControlLeft", "ControlRight", "MetaLeft", "MetaRight"];
            Shift: ["ShiftLeft", "ShiftRight"];
        };
        static PROTECTED_KEYS: [
            "F5",
            "F11",
            "F12",
            "PrintScreen",
            "ScrollLock",
            "NumLock",
            "CapsLock"
        ];
        static CONTROL_KEY_STRING: "⌘" | "Control";

        downKeys: Set<string>;
        moveKeys: Set<string>;

        isModifierActive(key: ModifierKey): boolean;
    }
}

export type {};
