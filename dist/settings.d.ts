declare type RegisterSettingOptions<T extends SettingType> = Omit<SettingOptions<T>, "choices"> & {
    choices?: string[] | SettingOptions["choices"];
};
/**
 * scope = "world"
 *
 * config = true
 */
declare function registerSetting<T extends SettingType>(options: RegisterSettingOptions<T>): void;
declare function registerSettingMenu<T extends ConstructorOf<FormApplication>>(options: SettingMenuOptions<T>): void;
declare function settingPath(...path: string[]): `${string}.${string}`;
declare function getSetting<T = boolean>(key: string): T;
declare function setSetting<T>(key: string, value: T): Promise<T>;
declare function isClientSetting(setting: ClientSetting | ClientSettingMenu): boolean;
declare function isWorldSetting(setting: ClientSetting | ClientSettingMenu): boolean;
declare function isMenuSetting(setting: ClientSetting | ClientSettingMenu): setting is ClientSettingMenu;
export type { RegisterSettingOptions };
export { getSetting, isMenuSetting, isWorldSetting, isClientSetting, registerSetting, registerSettingMenu, setSetting, settingPath, };
