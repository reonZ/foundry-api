declare global {
    interface FactorySetting extends SettingsConfig.CategorySetting {
        group?: string;
        persistent?: boolean;
        saveOnInput?: boolean;
        onInput?: <T extends string | number | boolean>(
            value: T,
            previous: T
        ) => boolean | Promise<boolean>;
        display?: (value: this["default"]) => boolean | Promise<boolean>;
    }

    interface FactorySettingMenu extends SettingsConfig.CategoryMenu {
        group?: string;
    }

    type FactorySettingAny = FactorySetting | FactorySettingMenu;
}

export type {};
