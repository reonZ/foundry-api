declare global {
    type SettingOptionsBase = {
        key: string;
        name?: string;
        hint?: string;
        scope?: "client" | "world";
        config?: boolean;
        requiresReload?: boolean;
    };

    type SettingOptions<T extends string = string> = SettingOptionsBase &
        (
            | {
                  type: StringConstructor;
                  choices?: Record<T, string> | T[];
                  default: T;
                  onChange?: (value: T) => Promisable<void>;
              }
            | {
                  type: NumberConstructor;
                  default: number;
                  range?: { min: number; max: number; step: number };
                  onChange?: (value: number) => Promisable<void>;
              }
            | {
                  type: BooleanConstructor;
                  default: boolean;
                  onChange?: (value: boolean) => Promisable<void>;
              }
            | {
                  type: ArrayConstructor;
                  default: Array<any>;
                  onChange?: (value: Array<any>) => Promisable<void>;
              }
        );

    type ClientSetting = Omit<SettingOptions, "scope" | "config"> &
        Required<Pick<SettingOptions, "scope" | "config">> & {
            namespace: string;
        };

    interface SettingMenuOptions<
        T extends ConstructorOf<FormApplication> = ConstructorOf<FormApplication>
    > {
        key: string;
        type: T;
        name?: string;
        label?: string;
        hint?: string;
        icon?: string;
        restricted?: boolean;
    }

    interface ClientSettingMenu<
        T extends ConstructorOf<FormApplication> = ConstructorOf<FormApplication>
    > extends SettingMenuOptions<T> {
        namespace: string;
    }

    class SettingsStorage extends Map {
        get(key: "client"): Storage;
        get(key: "world"): WorldSettings;
        set(key: string, value: unknown): this;
    }

    class Setting<V extends JSONValue = JSONValue> extends FoundryDocument {
        constructor(options: { key: string; value: unknown });
        key: string;
        value: V;
    }

    class ClientSettings {
        menus: Map<string, ClientSettingMenu>;
        settings: Map<string, ClientSetting>;
        storage: SettingsStorage;
        register(namespace: string, key: string, data: SettingOptions): void;
        registerMenu<T extends ConstructorOf<FormApplication>>(
            namespace: string,
            key: string,
            data: SettingMenuOptions<T>
        ): void;
        get<T>(namespace: string, key: string): T;
        set<T>(namespace: string, key: string, value: T): Promise<T>;
    }
}

export type {};
