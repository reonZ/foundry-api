declare function createChatLink(docOrUuid: FoundryDocument | string, { label, html }?: {
    label?: string;
    html?: true;
}): Promise<string>;
declare function createChatLink(docOrUuid: FoundryDocument | string, { label, html }: {
    label?: string;
    html: false;
}): string;
export { createChatLink };
