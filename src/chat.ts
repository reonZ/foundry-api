function createChatLink(
    docOrUuid: FoundryDocument | string,
    options: { label?: string; html: false }
): string;
function createChatLink(
    docOrUuid: FoundryDocument | string,
    options?: { label?: string; html?: true }
): Promise<string>;
function createChatLink(
    docOrUuid: FoundryDocument | string,
    { label, html }: { label?: string; html?: boolean } = {}
): Promisable<string> {
    const isDocument = docOrUuid instanceof foundry.abstract.Document;

    if (!label && isDocument) {
        label = docOrUuid.name;
    }

    let link = `@UUID[${isDocument ? docOrUuid.uuid : docOrUuid}]`;

    if (label) {
        link = `${link}{${label}}`;
    }

    return html ? TextEditor.enrichHTML(link) : link;
}

function* latestChatMessages<T extends ChatMessage>(nb: number, fromMessage?: T) {
    const chat = ui.chat?.element;
    if (!chat) return;

    const messages = game.messages.contents;
    const start =
        (fromMessage ? messages.findLastIndex((m) => m === fromMessage) : messages.length) - 1;

    for (let i = start; i >= start - nb; i--) {
        const message = messages[i] as T;
        if (!message) return;

        const li = chat.find(`[data-message-id=${message.id}]`);
        if (!li.length) continue;

        yield { message, li };
    }
}

async function refreshLatestMessages(nb: number) {
    for (const { message, li } of latestChatMessages(20)) {
        const html = await message.getHTML();
        li.replaceWith(html);
    }
}

export { createChatLink, refreshLatestMessages, latestChatMessages };
