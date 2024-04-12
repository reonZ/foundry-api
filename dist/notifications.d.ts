type NotificationData = Record<string, string | number | boolean>;
declare function warn(str: string, arg1?: NotificationData | boolean, arg2?: boolean): void;
declare function info(str: string, arg1?: NotificationData | boolean, arg2?: boolean): void;
declare function error(str: string, arg1?: NotificationData | boolean, arg2?: boolean): void;
export { error, info, warn };
