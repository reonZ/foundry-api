import { getSourceIdCondition } from ".";

function getItems(actor: Actor, itemTypes: string | string[] = []) {
    const types = typeof itemTypes === "string" ? [itemTypes] : itemTypes;
    return types.length ? types.flatMap((type) => actor.itemTypes[type]) : actor.items;
}

function hasItemWithSourceId(
    actor: Actor,
    sourceId: string | string[],
    itemTypes?: string | string[]
) {
    return getItems(actor, itemTypes).some(getSourceIdCondition(sourceId));
}

function getItemWithSourceId<T extends Item>(
    actor: Actor,
    sourceId: string,
    itemTypes: string | string[]
) {
    return getItems(actor, itemTypes).find(getSourceIdCondition(sourceId)) as T | undefined;
}

export { getItemWithSourceId, hasItemWithSourceId, getItems };
