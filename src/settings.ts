import { mapToObj } from "remeda";
import { MODULE } from ".";

export declare type RegisterSettingOptions<T extends SettingType> = Omit<
    SettingOptions<T>,
    "choices"
> & {
    choices?: string[] | SettingOptions["choices"];
};

export function registerSetting<T extends SettingType>(options: RegisterSettingOptions<T>) {
    if (Array.isArray(options.choices)) {
        options.choices = mapToObj(options.choices, (choice) => [
            choice,
            settingPath(options.key, "choices", choice),
        ]);
    }

    options.name ??= settingPath(options.key, "name");
    options.hint ??= settingPath(options.key, "hint");
    options.scope ??= "world";
    options.config ??= true;

    game.settings.register(MODULE.id, options.key, options as SettingOptions<T>);
}

export function registerSettingMenu<T extends ConstructorOf<FormApplication>>(
    options: SettingMenuOptions<T>
) {
    options.name ??= settingPath("menus", options.key, "name");
    options.label ??= settingPath("menus", options.key, "label");
    options.hint ??= settingPath("menus", options.key, "hint");
    options.restricted ??= true;
    options.icon ??= "fas fa-cogs";

    game.settings.registerMenu(MODULE.id, options.key, options);
}

export function settingPath(...path: string[]) {
    return MODULE.path("settings", ...path);
}

export function getSetting<T>(key: string) {
    return game.settings.get<T>(MODULE.id, key);
}

export function setSetting<T>(key: string, value: T) {
    return game.settings.set<T>(MODULE.id, key, value);
}

export function isClientSetting(setting: ClientSetting | ClientSettingMenu) {
    if ("restricted" in setting) return !setting.restricted;
    return "scope" in setting && setting.scope === "client";
}

export function isWorldSetting(setting: ClientSetting | ClientSettingMenu) {
    if ("restricted" in setting) return !!setting.restricted;
    return "scope" in setting && setting.scope === "world";
}

export function isMenuSetting(
    setting: ClientSetting | ClientSettingMenu
): setting is ClientSettingMenu {
    return setting.type.prototype instanceof FormApplication;
}
