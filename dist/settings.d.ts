declare type RegisterSettingOptions = SettingOptions;
/**
 * scope = "world"
 *
 * config = true
 */
declare function registerSetting(options: RegisterSettingOptions): void;
declare function registerSettingMenu<T extends ConstructorOf<FormApplication>>(options: SettingMenuOptions<T>): void;
declare function settingPath(...path: string[]): `${string}.${string}`;
declare function getSetting<T = boolean>(key: string): T;
declare function setSetting<T>(key: string, value: T): Promise<T>;
declare function isClientSetting(setting: ClientSetting | ClientSettingMenu): boolean;
declare function isWorldSetting(setting: ClientSetting | ClientSettingMenu): boolean;
declare function isMenuSetting(setting: ClientSetting | ClientSettingMenu): setting is ClientSettingMenu;
export type { RegisterSettingOptions };
export { getSetting, isMenuSetting, isWorldSetting, isClientSetting, registerSetting, registerSettingMenu, setSetting, settingPath, };
