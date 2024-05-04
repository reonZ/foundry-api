import { MODULE } from "./module";

function getSourceId(doc: FoundryDocument) {
    return doc.getFlag<string>("core", "sourceId");
}

function includesSourceId(doc: FoundryDocument, list: string[]) {
    const sourceId = getSourceId(doc);
    return sourceId ? list.includes(sourceId) : false;
}

function getSourceIdCondition(sourceId: string | string[]) {
    return Array.isArray(sourceId)
        ? (item: Item) => includesSourceId(item, sourceId)
        : (item: Item) => getSourceId(item) === sourceId;
}

function getSortBounds<T extends { sort: number }>(collection: T[] | Collection<T>) {
    let min = 0;
    let max = 0;

    for (const entry of collection) {
        if (entry.sort > max) max = entry.sort;
        else if (entry.sort < min) min = entry.sort;
    }

    return { min, max };
}

export { getSourceId, getSourceIdCondition, getSortBounds };
