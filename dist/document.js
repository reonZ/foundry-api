"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceIdCondition = exports.getSourceId = exports.getSortBounds = void 0;
function getSourceId(doc) {
    return doc._stats.compendiumSource ?? doc.flags.core?.sourceId;
}
exports.getSourceId = getSourceId;
function includesSourceId(doc, list) {
    const sourceId = getSourceId(doc);
    return sourceId ? list.includes(sourceId) : false;
}
function getSourceIdCondition(sourceId) {
    return Array.isArray(sourceId)
        ? (item) => includesSourceId(item, sourceId)
        : (item) => getSourceId(item) === sourceId;
}
exports.getSourceIdCondition = getSourceIdCondition;
function getSortBounds(collection) {
    let min = 0;
    let max = 0;
    for (const entry of collection) {
        if (entry.sort > max)
            max = entry.sort;
        else if (entry.sort < min)
            min = entry.sort;
    }
    return { min, max };
}
exports.getSortBounds = getSortBounds;
