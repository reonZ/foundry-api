declare global {
    type SettingType =
        | StringConstructor
        | BooleanConstructor
        | NumberConstructor
        | ArrayConstructor
        | ObjectConstructor
        | typeof FoundryDocument;

    interface SettingOptions<
        T extends SettingType = SettingType,
        V = InstanceType<T> | undefined | null
    > {
        key: string;
        type: T;
        default: V;
        name?: string;
        hint?: string;
        scope?: "client" | "world";
        config?: boolean;
        requiresReload?: boolean;
        onChange?: (value: V) => Promisable<void>;
        choices?: Record<string, string>;
        range?: { min: number; max: number; step: number };
    }

    interface ClientSetting<T extends SettingType = SettingType>
        extends Omit<SettingOptions<T>, "scope" | "config">,
            Required<Pick<SettingOptions<T>, "scope" | "config">> {
        namespace: string;
    }

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
        register<T extends SettingType>(
            namespace: string,
            key: string,
            data: SettingOptions<T>
        ): void;
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
