declare global {
    class Macro extends FoundryDocument {
        static fromDropData<TDocument extends foundry.abstract.Document>(
            this: ConstructorOf<TDocument>,
            data: object,
            options?: Record<string, unknown>
        ): Promise<TDocument | undefined>;

        /**
         * Execute the Macro command.
         * @param {object} [scope={}]     Macro execution scope which is passed to script macros
         * @param {Actor} [scope.actor]     An Actor who is the protagonist of the executed action
         * @param {Token} [scope.token]     A Token which is the protagonist of the executed action
         * @returns {ChatMessage|*}       A created ChatMessage from chat macros or returned value from script macros
         */
        execute(scope?: { actor?: Actor; token?: Token }): Promise<any>;
    }
}

export type {};
