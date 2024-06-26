declare global {
    class SettingsConfig extends FormApplication {
        _updateObject(event: SubmitEvent, formData: Record<string, string>): Promise<void>;
        static reloadConfirm(options?: { world?: boolean }): Promise<void>;

        _previewFontScaling(event: { currentTarget: HTMLInputElement }): void;
    }

    namespace SettingsConfig {
        interface CategorySetting extends ClientSetting {
            id: `${ClientSetting["namespace"]}.${ClientSetting["key"]}`;
            isCheckbox: boolean;
            isSelect: boolean;
            isRange: false | { min: number; max: number; step: number };
            isNumber: boolean;
            filePickerType?: any;
            value: this["default"];
        }

        type CategoryMenu = ClientSettingMenu;

        type Category = {
            id: string;
            title: string;
            count: number;
            menus: CategoryMenu[];
            settings: CategorySetting[];
        };

        type RenderInnerData = {
            categories: Category[];
            total: number;
            user: User;
            canConfigure: boolean;
            categoryTemplate: string;
            submitButton: boolean;
        };
    }
}

export type {};
