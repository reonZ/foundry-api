import { localize } from ".";

type NotificationData = Record<string, string | number | boolean>;

function notify(
    str: string,
    arg1?: "warning" | "info" | "error" | NotificationData | boolean,
    arg2?: NotificationData | boolean,
    arg3?: boolean
): void {
    const type = typeof arg1 === "string" ? arg1 : "info";
    const data = typeof arg1 === "object" ? arg1 : typeof arg2 === "object" ? arg2 : undefined;
    const permanent =
        typeof arg1 === "boolean" ? arg1 : typeof arg2 === "boolean" ? arg2 : arg3 ?? false;

    ui.notifications.notify(localize(str, data as NotificationData), type, { permanent });
}

function warn(str: string, arg1?: NotificationData | boolean, arg2?: boolean) {
    notify(str, "warning", arg1, arg2);
}

function info(str: string, arg1?: NotificationData | boolean, arg2?: boolean) {
    notify(str, "info", arg1, arg2);
}

function error(str: string, arg1?: NotificationData | boolean, arg2?: boolean) {
    notify(str, "error", arg1, arg2);
}

export { error, info, warn };
