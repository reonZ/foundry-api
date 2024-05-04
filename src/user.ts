function getCurrentUser() {
    return game.user ?? game.data.users.find((x) => x._id === game.data.userId);
}

function isActiveGM() {
    return game.user === game.users.activeGM;
}

function userIsGM(user?: User) {
    user ??= getCurrentUser();
    return user && user.role >= CONST.USER_ROLES.ASSISTANT;
}

function hasGMOnline() {
    return game.users.some((user) => user.active && user.isGM);
}

export { hasGMOnline, isActiveGM, userIsGM };
