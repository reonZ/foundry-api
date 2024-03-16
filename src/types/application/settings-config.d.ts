declare global {
    class SettingsConfig extends FormApplication {
        static reloadConfirm(options?: { world?: boolean }): Promise<void>;
    }

    namespace SettingsConfig {
        interface CategorySetting<T extends SettingType = SettingType> extends ClientSetting<T> {
            id: `${ClientSetting["namespace"]}.${ClientSetting["key"]}`;
            isCheckbox: boolean;
            isSelect: boolean;
            isRange: false | { min: number; max: number; step: number };
            isNumber: boolean;
            filePickerType?: any;
            value: this["default"];
        }

        type CategoryMenu = ClientSettingMenu;

        type Category<
            S extends CategorySetting = CategorySetting,
            M extends CategoryMenu = CategoryMenu
        > = {
            id: string;
            title: string;
            count: number;
            menus: M[];
            settings: S[];
        };

        type RenderInnerData<
            S extends CategorySetting = CategorySetting,
            M extends CategoryMenu = CategoryMenu
        > = {
            categories: Category<S, M>[];
            total: number;
            user: User;
            canConfigure: boolean;
            categoryTemplate: string;
            submitButton: boolean;
        };
    }
}

export type {};
