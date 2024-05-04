"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlayedActor = exports.isOwner = exports.getOwner = exports.getHighestName = void 0;
function isPlayedActor(actor) {
    return !!actor?.id && !actor.pack && game.actors.has(actor.id);
}
exports.isPlayedActor = isPlayedActor;
function getHighestName(actor) {
    return actor.token?.name ?? actor.prototypeToken?.name ?? actor.name;
}
exports.getHighestName = getHighestName;
function getOwner(actor) {
    const isValidUser = (user) => user.active && !user.isGM;
    let owners = game.users.filter((user) => isValidUser(user) && user.character === actor);
    if (!owners.length) {
        owners = game.users.filter((user) => isValidUser(user) && actor.testUserPermission(user, "OWNER"));
    }
    owners.sort((a, b) => (a.id > b.id ? 1 : -1));
    return owners[0] || null;
}
exports.getOwner = getOwner;
function isOwner(actor) {
    return getOwner(actor) === game.user;
}
exports.isOwner = isOwner;
