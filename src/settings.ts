import * as R from "remeda";
import { MODULE } from ".";

declare type RegisterSettingOptions<T extends SettingType> = Omit<SettingOptions<T>, "choices"> & {
    choices?: string[] | SettingOptions["choices"];
};

/**
 * scope = "world"
 *
 * config = true
 */
function registerSetting<T extends SettingType>(options: RegisterSettingOptions<T>) {
    if (Array.isArray(options.choices)) {
        options.choices = R.mapToObj(options.choices, (choice) => [
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

function registerSettingMenu<T extends ConstructorOf<FormApplication>>(
    options: SettingMenuOptions<T>
) {
    options.name ??= settingPath("menus", options.key, "name");
    options.label ??= settingPath("menus", options.key, "label");
    options.hint ??= settingPath("menus", options.key, "hint");
    options.restricted ??= true;
    options.icon ??= "fas fa-cogs";

    game.settings.registerMenu(MODULE.id, options.key, options);
}

function settingPath(...path: string[]) {
    return MODULE.path("settings", ...path);
}

function getSetting<T = boolean>(key: string) {
    return game.settings.get<T>(MODULE.id, key);
}

function setSetting<T>(key: string, value: T) {
    return game.settings.set<T>(MODULE.id, key, value);
}

function isClientSetting(setting: ClientSetting | ClientSettingMenu) {
    if ("restricted" in setting) return !setting.restricted;
    return "scope" in setting && setting.scope === "client";
}

function isWorldSetting(setting: ClientSetting | ClientSettingMenu) {
    if ("restricted" in setting) return !!setting.restricted;
    return "scope" in setting && setting.scope === "world";
}

function isMenuSetting(setting: ClientSetting | ClientSettingMenu): setting is ClientSettingMenu {
    return setting.type.prototype instanceof FormApplication;
}

export type { RegisterSettingOptions };
export {
    getSetting,
    isMenuSetting,
    isWorldSetting,
    isClientSetting,
    registerSetting,
    registerSettingMenu,
    setSetting,
    settingPath,
};
