declare function isPlayedActor<T extends Actor>(actor?: T | null): actor is T;
declare function getHighestName(actor: Actor): string;
declare function getOwner(actor: Actor): User | null;
declare function isOwner(actor: Actor): boolean;
export { getHighestName, getOwner, isOwner, isPlayedActor };
