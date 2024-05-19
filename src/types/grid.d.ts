declare global {
    abstract class BaseGrid {
        size: number;
        sizeX: number;
        sizeY: number;
        distance: number;
        units: string;
        style: string;
        thickness: number;
        color: Color;
        alpha: number;
    }

    class SquareGrid extends BaseGrid {
        type: (typeof CONST.GRID_TYPES)[keyof typeof CONST.GRID_TYPES];
    }
}

export type {};
