import { render } from ".";

export async function confirmDialog(options: {
    template: string;
    data: Record<string, unknown>;
    title: string;
    defaultYes?: boolean;
    id: string;
}) {
    const content = await render(options.template, options.data);
    return Dialog.confirm({
        title: options.title,
        content,
        defaultYes: options.defaultYes ?? false,
        options: {
            id: options.id,
        },
    });
}

export async function waitDialog<R = unknown>(options: {
    yes: DialogButton;
    no: string;
    template: string;
    title: string;
    id: string;
    data: Record<string, unknown>;
}) {
    const yesIcon = options.yes.icon ?? "fa-solid fa-check";

    const buttons = {
        yes: {
            icon: `<i class='${yesIcon}'></i>`,
            label: options.yes.label,
            callback: options.yes.callback,
        },
        no: {
            icon: "<i class='fa-solid fa-xmark'></i>",
            label: options.no,
            callback: () => null,
        },
    };

    const content = await render(options.template, options.data);

    return Dialog.wait<R | null>(
        {
            title: options.title,
            content,
            buttons,
            default: "yes",
            close: () => null,
        },
        {
            id: options.id,
        }
    );
}
