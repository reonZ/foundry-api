declare global {
    interface DropCanvasData<T extends string = string, D extends object = object> {
        type?: T;
        data?: D extends foundry.abstract.Document ? D["_source"] : D;
        uuid?: DocumentUUID;
        id?: string;
        pack?: string;
        x: number;
        y: number;
        documentName?: string;
        actorId?: string;
        tokenId?: string;
    }
}

export type {};
