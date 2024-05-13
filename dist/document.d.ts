declare function getSourceId(doc: FoundryDocument): any;
declare function getSourceIdCondition(sourceId: string | string[]): (item: Item) => boolean;
declare function getSortBounds<T extends {
    sort: number;
}>(collection: T[] | Collection<T>): {
    min: number;
    max: number;
};
export { getSortBounds, getSourceId, getSourceIdCondition };
