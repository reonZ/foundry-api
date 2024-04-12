"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = exports.hasItemWithSourceId = exports.getItemWithSourceId = void 0;
const _1 = require(".");
function getItems(actor, itemTypes = []) {
    const types = typeof itemTypes === "string" ? [itemTypes] : itemTypes;
    return types.length ? types.flatMap((type) => actor.itemTypes[type]) : actor.items;
}
exports.getItems = getItems;
function hasItemWithSourceId(actor, sourceId, itemTypes) {
    return getItems(actor, itemTypes).some((0, _1.getSourceIdCondition)(sourceId));
}
exports.hasItemWithSourceId = hasItemWithSourceId;
function getItemWithSourceId(actor, sourceId, itemTypes) {
    return getItems(actor, itemTypes).find((0, _1.getSourceIdCondition)(sourceId));
}
exports.getItemWithSourceId = getItemWithSourceId;
