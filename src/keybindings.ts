import { localizePath } from "./localize";
import { MODULE } from "./module";

function registerKeybind(name: string, data: Partial<KeybindingActionConfig>) {
    game.keybindings.register(MODULE.id, name, {
        ...data,
        name: localizePath("keybindings", name, "name"),
        hint: localizePath("keybindings", name, "hint"),
    });
}

export { registerKeybind };
