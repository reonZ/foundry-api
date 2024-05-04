function isPlayedActor<T extends Actor>(actor?: T | null): actor is T {
    return !!actor?.id && !actor.pack && game.actors.has(actor.id);
}

function getHighestName(actor: Actor) {
    return actor.token?.name ?? actor.prototypeToken?.name ?? actor.name;
}

function getOwner(actor: Actor): User | null {
    const isValidUser = (user: User) => user.active && !user.isGM;

    let owners = game.users.filter((user) => isValidUser(user) && user.character === actor);

    if (!owners.length) {
        owners = game.users.filter(
            (user) => isValidUser(user) && actor.testUserPermission(user, "OWNER")
        );
    }

    owners.sort((a, b) => (a.id > b.id ? 1 : -1));

    return owners[0] || null;
}

function isOwner(actor: Actor) {
    return getOwner(actor) === game.user;
}

export { getHighestName, getOwner, isOwner, isPlayedActor };
