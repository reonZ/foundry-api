declare function getSourceId(doc: FoundryDocument): string | undefined;
declare function getSourceIdCondition(sourceId: string | string[]): (item: Item) => boolean;
declare function getSortBounds<T extends {
    sort: number;
}>(collection: T[] | Collection<T>): {
    min: number;
    max: number;
};
export { getSourceId, getSourceIdCondition, getSortBounds };
