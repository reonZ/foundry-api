declare function getItems(actor: Actor, itemTypes?: string | string[]): Item<Actor>[] | EmbeddedCollection<Item<Actor>>;
declare function hasItemWithSourceId(actor: Actor, sourceId: string | string[], itemTypes?: string | string[]): boolean;
declare function getItemWithSourceId<T extends Item>(actor: Actor, sourceId: string, itemTypes: string | string[]): T;
export { getItemWithSourceId, hasItemWithSourceId, getItems };
