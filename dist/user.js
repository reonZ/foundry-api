"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIsGM = exports.isActiveGM = exports.hasGMOnline = void 0;
function getCurrentUser() {
    return game.user ?? game.data.users.find((x) => x._id === game.data.userId);
}
function isActiveGM() {
    return game.user === game.users.activeGM;
}
exports.isActiveGM = isActiveGM;
function userIsGM(user) {
    user ??= getCurrentUser();
    return user && user.role >= CONST.USER_ROLES.ASSISTANT;
}
exports.userIsGM = userIsGM;
function hasGMOnline() {
    return game.users.some((user) => user.active && user.isGM);
}
exports.hasGMOnline = hasGMOnline;
