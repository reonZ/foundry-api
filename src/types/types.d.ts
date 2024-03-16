declare global {
    type ConstructorOf<T> = new (...args: any[]) => T;

    type JsonType = number | string | boolean | null | Array<JsonType> | { [k: string]: JsonType };

    type CyclicRecord<T = unknown> = {
        [k: string]: T | CyclicRecord<T>;
    };

    type FlattenedCyclicRecord<O extends CyclicRecord> = O extends CyclicRecord<infer T>
        ? Record<string, T>
        : O;

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

    type Updatable<O> = O extends object
        ? {
              [K in keyof O & string]?: Updatable<O[K] | true>;
          }
        : O;

    // type Updatable<O> = O extends object
    //     ? {
    //           [K in keyof O as `-=${K & string}`]: boolean;
    //       } & {
    //           [K in keyof O]?: Updatable<O[K]>;
    //       }
    //     : O;

    type DeleteKey = `-=${string}`;
}

export type {};
