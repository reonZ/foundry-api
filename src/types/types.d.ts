declare global {
    type ConstructorOf<T> = new (...args: any[]) => T;

    type JSONValue =
        | string
        | number
        | boolean
        | { [k: string]: JSONValue }
        | Array<JSONValue>
        | null
        | undefined;

    type CyclicRecord<T = unknown> = {
        [k: string]: T | CyclicRecord<T>;
    };

    type RawObject<TModel extends FoundryDocument> = TModel extends { system: infer TSystem }
        ? Omit<TModel, "system"> & { system: TSystem }
        : TModel["_source"];

    interface DataModelConstructionOptions<TParent extends FoundryDocument | null> {
        parent?: TParent;
        strict?: boolean;
        fallback?: boolean;
        partial?: boolean;
        [key: string]: unknown;
    }

    interface DocumentConstructionContext<TParent extends FoundryDocument | null>
        extends DataModelConstructionOptions<TParent> {
        pack?: string | null;
    }

    type FlattenedCyclicRecord<O extends CyclicRecord> = O extends CyclicRecord<infer T>
        ? Record<string, T>
        : O;

    type StringNumber = `${number}`;
    type StringBoolean = `${boolean}`;

    type TYPES =
        | "bigint"
        | "boolean"
        | "function"
        | "number"
        | "object"
        | "string"
        | "symbol"
        | "undefined";

    type DeepPartial<T> = T extends object
        ? {
              [P in keyof T]?: DeepPartial<T[P]>;
          }
        : T;

    type Primitive = string | number | boolean | bigint | symbol | undefined | null;

    export type DeepRequired<Type> = Type extends Error
        ? Required<Type>
        : Type extends Primitive | Function | Date | Error | RegExp
        ? Type
        : Type extends Map<infer Keys, infer Values>
        ? Map<DeepRequired<Keys>, DeepRequired<Values>>
        : Type extends ReadonlyMap<infer Keys, infer Values>
        ? ReadonlyMap<DeepRequired<Keys>, DeepRequired<Values>>
        : Type extends WeakMap<infer Keys, infer Values>
        ? WeakMap<DeepRequired<Keys>, DeepRequired<Values>>
        : Type extends Set<infer Values>
        ? Set<DeepRequired<Values>>
        : Type extends ReadonlySet<infer Values>
        ? ReadonlySet<DeepRequired<Values>>
        : Type extends WeakSet<infer Values>
        ? WeakSet<DeepRequired<Values>>
        : Type extends Promise<infer Value>
        ? Promise<DeepRequired<Value>>
        : Type extends {}
        ? { [Key in keyof Type]-?: DeepRequired<Type[Key]> }
        : Required<Type>;

    type Updatable<O> = O extends object
        ? {
              [K in keyof O & string]?: Updatable<O[K] | true>;
          }
        : O;

    type Maybe<T> = T | null | undefined;

    type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
        {
            [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
        }[Keys];

    type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
        {
            [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
        }[Keys];

    type DeleteKey = `-=${string}`;

    type Promisable<T> = T | Promise<T>;
}

export type {};
