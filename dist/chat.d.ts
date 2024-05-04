/// <reference types="jquery" />
declare function createChatLink(docOrUuid: FoundryDocument | string, options: {
    label?: string;
    html: false;
}): string;
declare function createChatLink(docOrUuid: FoundryDocument | string, options?: {
    label?: string;
    html?: true;
}): Promise<string>;
declare function latestChatMessages<T extends ChatMessage>(nb: number, fromMessage?: T): Generator<{
    message: T;
    li: JQuery<HTMLElement>;
}, void, unknown>;
declare function refreshLatestMessages(nb: number): Promise<void>;
export { createChatLink, refreshLatestMessages, latestChatMessages };
