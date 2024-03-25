export const AsyncFunction = (async () => {}).constructor as {
    new (...args: any[]): () => Promise<any>;
};
