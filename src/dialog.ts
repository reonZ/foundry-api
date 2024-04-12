import { render } from ".";

async function confirmDialog(options: {
    template: string;
    data: Record<string, unknown>;
    title: string;
    defaultYes?: boolean;
    id?: string;
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

async function waitDialog<Y, N>(options: {
    yes: Required<Omit<DialogButton<Y>, "icon">> & { icon?: string };
    no: DialogButton<N> & { label: string };
    template: string;
    title: string;
    id?: string;
    default?: "yes" | "no";
    data: Record<string, unknown>;
}): Promise<Y | N | null> {
    const yesIcon = options.yes.icon ?? "fa-solid fa-check";
    const noIcon = options.no.icon ?? "fa-solid fa-xmark";

    const buttons = {
        yes: {
            icon: `<i class='${yesIcon}'></i>`,
            label: options.yes.label,
            callback: options.yes.callback,
        },
        no: {
            icon: `<i class='${noIcon}'></i>`,
            label: options.no.label,
            callback: options.no.callback ?? ((() => null) as () => N),
        },
    } as const;

    const content = await render(options.template, options.data);

    return Dialog.wait<Y | N>(
        {
            title: options.title,
            content,
            buttons,
            default: options.default ?? "yes",
            close: () => null,
        },
        {
            id: options.id,
        }
    );
}

export { confirmDialog, waitDialog };
