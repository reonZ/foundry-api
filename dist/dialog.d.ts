declare function confirmDialog(options: {
    template: string;
    data: Record<string, unknown>;
    title: string;
    defaultYes?: boolean;
    id?: string;
}): Promise<boolean | null>;
declare function waitDialog<Y, N>(options: {
    yes: Required<Omit<DialogButton<Y>, "icon">> & {
        icon?: string;
    };
    no: DialogButton<N> & {
        label: string;
    };
    template: string;
    title: string;
    id?: string;
    default?: "yes" | "no";
    data: Record<string, unknown>;
}): Promise<Y | N | null>;
export { confirmDialog, waitDialog };
