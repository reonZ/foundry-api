declare global {
    abstract class PlaceableObject<
        TDocument extends CanvasDocument = CanvasDocument
    > extends PIXI.Container {
        hitArea: PIXI.Rectangle;
    }

    class RenderFlags extends Set<string> {
        handle(flag: string): boolean;
        set(changes: Record<string, boolean>): void;
    }

    class ClockwiseSweepPolygon extends PointSourcePolygon {}

    type WallRestrictionType = "light" | "sight" | "move" | "sound";

    interface PointSourcePolygonConfig {
        type?: WallRestrictionType;
        angle?: number;
        density?: number;
        radius?: number;
        rotation?: number;
        debug?: boolean;
        walls?: boolean;
        source?: PointSource;
        boundaryShape?: (PIXI.Rectangle | PIXI.Circle | PIXI.Polygon)[];
    }

    abstract class PointSource<TObject extends PlaceableObject | null = PlaceableObject | null> {}

    abstract class PointSourcePolygon extends PIXI.Polygon {
        static testCollision(
            origin: Point,
            destination: Point,
            config?: PointSourcePolygonConfig & { mode: "closest" }
        ): PolygonVertex | null;
        static testCollision(
            origin: Point,
            destination: Point,
            config?: PointSourcePolygonConfig & { mode: "any" }
        ): boolean;
        static testCollision(
            origin: Point,
            destination: Point,
            config?: PointSourcePolygonConfig & { mode: "all" }
        ): PolygonVertex[];
        static testCollision(
            origin: Point,
            destination: Point,
            config?: PointSourcePolygonConfig & { mode?: "any" | "all" | "closest" }
        ): boolean | PolygonVertex | PolygonVertex[] | null;
    }

    class PolygonVertex {}

    abstract class CanvasLayer {}

    abstract class InteractionLayer extends CanvasLayer {}

    abstract class PlaceablesLayer<
        TObject extends PlaceableObject = PlaceableObject
    > extends InteractionLayer {
        quadtree: CanvasQuadtree<TObject>;
    }

    class CanvasQuadtree<
        TPlaceableObject extends PlaceableObject
    > extends Quadtree<TPlaceableObject> {}

    class Quadtree<TPlaceableObject extends PlaceableObject> {
        getObjects(
            rect: PIXI.Rectangle,
            options?: {
                collisionTest?: (obj: QuadtreeObject, rect: PIXI.Rectangle) => boolean;
                _s: Set<TPlaceableObject>;
            }
        ): Set<TPlaceableObject>;
    }

    interface QuadtreeObject<
        TPlaceableObject extends PlaceableObject = PlaceableObject,
        TQuadtree extends Quadtree<TPlaceableObject> = Quadtree<TPlaceableObject>
    > {
        r: Rectangle;
        t: TPlaceableObject;
        n: Set<TQuadtree>;
    }

    type Rectangle = PIXI.Rectangle | { x: number; y: number; width: number; height: number };

    type Point = { x: number; y: number };

    namespace PIXI {
        class Circle {}

        class Polygon {
            points: number[];
            closeStroke: boolean;
            readonly type: SHAPES.POLY;
            constructor(points: IPointData[] | number[]);
            constructor(...points: IPointData[] | number[]);
            clone(): Polygon;
            contains(x: number, y: number): boolean;
            toString(): string;
        }

        interface IPointData {
            x: number;
            y: number;
        }

        class Graphics extends Container {}

        interface IPoint extends IPointData {
            copyFrom(p: IPointData): this;
            copyTo<T extends IPoint>(p: T): T;
            equals(p: IPointData): boolean;
            set(x?: number, y?: number): void;
        }
        enum SHAPES {
            POLY = 0,
            RECT = 1,
            CIRC = 2,
            ELIP = 3,
            RREC = 4,
        }
        class Point implements IPoint {
            x: number;
            y: number;
            constructor(x?: number, y?: number);
            clone(): Point;
            copyFrom(p: IPointData): this;
            copyTo<T extends IPoint>(p: T): T;
            equals(p: IPointData): boolean;
            set(x?: number, y?: number): this;
            toString(): string;
        }
        class Renderer {}
        class Bounds {
            minX: number;
            minY: number;
            maxX: number;
            maxY: number;
            rect: Rectangle;
            updateID: number;
            constructor();
            isEmpty(): boolean;
            clear(): void;
            getRectangle(rect?: Rectangle): Rectangle;
            addPoint(point: IPointData): void;
            addPointMatrix(matrix: Matrix, point: IPointData): void;
            addQuad(vertices: Float32Array): void;
            addFrame(transform: Transform, x0: number, y0: number, x1: number, y1: number): void;
            addFrameMatrix(matrix: Matrix, x0: number, y0: number, x1: number, y1: number): void;
            addVertexData(vertexData: Float32Array, beginOffset: number, endOffset: number): void;
            addVertices(
                transform: Transform,
                vertices: Float32Array,
                beginOffset: number,
                endOffset: number
            ): void;
            addVerticesMatrix(
                matrix: Matrix,
                vertices: Float32Array,
                beginOffset: number,
                endOffset: number,
                padX?: number,
                padY?: number
            ): void;
            addBounds(bounds: Bounds): void;
            addBoundsMask(bounds: Bounds, mask: Bounds): void;
            addBoundsMatrix(bounds: Bounds, matrix: Matrix): void;
            addBoundsArea(bounds: Bounds, area: Rectangle): void;
            pad(paddingX?: number, paddingY?: number): void;
            addFramePad(
                x0: number,
                y0: number,
                x1: number,
                y1: number,
                padX: number,
                padY: number
            ): void;
        }

        class Shader {}

        class State {}

        class Filter extends Shader {}

        enum BLEND_MODES {
            NORMAL = 0,
            ADD = 1,
            MULTIPLY = 2,
            SCREEN = 3,
            OVERLAY = 4,
            DARKEN = 5,
            LIGHTEN = 6,
            COLOR_DODGE = 7,
            COLOR_BURN = 8,
            HARD_LIGHT = 9,
            SOFT_LIGHT = 10,
            DIFFERENCE = 11,
            EXCLUSION = 12,
            HUE = 13,
            SATURATION = 14,
            COLOR = 15,
            LUMINOSITY = 16,
            NORMAL_NPM = 17,
            ADD_NPM = 18,
            SCREEN_NPM = 19,
            NONE = 20,
            SRC_OVER = 0,
            SRC_IN = 21,
            SRC_OUT = 22,
            SRC_ATOP = 23,
            DST_OVER = 24,
            DST_IN = 25,
            DST_OUT = 26,
            DST_ATOP = 27,
            ERASE = 26,
            SUBTRACT = 28,
            XOR = 29,
        }
        interface ISpriteMaskFilter extends Filter {
            maskSprite: IMaskTarget;
        }
        abstract class DisplayObject {
            abstract sortDirty: boolean;
            parent: Container;
            worldAlpha: number;
            transform: Transform;
            alpha: number;
            visible: boolean;
            renderable: boolean;
            cullable: boolean;
            cullArea: Rectangle;
            filterArea: Rectangle;
            filters: Filter[] | null;
            isSprite: boolean;
            isMask: boolean;
            _lastSortedIndex: number;
            _mask: Container | MaskData;
            _bounds: Bounds;
            _localBounds: Bounds;
            displayObjectUpdateTransform: () => void;
            get destroyed(): boolean;
            abstract calculateBounds(): void;
            abstract removeChild(child: DisplayObject): void;
            abstract render(renderer: Renderer): void;
            protected _recursivePostUpdateTransform(): void;
            updateTransform(): void;
            getBounds(skipUpdate?: boolean, rect?: Rectangle): Rectangle;
            getLocalBounds(rect?: Rectangle): Rectangle;
            toGlobal<P extends IPointData = Point>(
                position: IPointData,
                point?: P,
                skipUpdate?: boolean
            ): P;
            toLocal<P extends IPointData = Point>(
                position: IPointData,
                from?: DisplayObject,
                point?: P,
                skipUpdate?: boolean
            ): P;
            setParent(container: Container): Container;
            removeFromParent(): void;
            setTransform(
                x?: number,
                y?: number,
                scaleX?: number,
                scaleY?: number,
                rotation?: number,
                skewX?: number,
                skewY?: number,
                pivotX?: number,
                pivotY?: number
            ): this;
            destroy(_options?: IDestroyOptions | boolean): void;
            enableTempParent(): Container;
            disableTempParent(cacheParent: Container): void;
            get x(): number;
            set x(value: number);
            get y(): number;
            set y(value: number);
            get worldTransform(): Matrix;
            get localTransform(): Matrix;
            get position(): ObservablePoint;
            set position(value: IPointData);
            get scale(): ObservablePoint;
            set scale(value: IPointData);
            get pivot(): ObservablePoint;
            set pivot(value: IPointData);
            get skew(): ObservablePoint;
            set skew(value: IPointData);
            get rotation(): number;
            set rotation(value: number);
            get angle(): number;
            set angle(value: number);
            get zIndex(): number;
            set zIndex(value: number);
            get worldVisible(): boolean;
            get mask(): Container | MaskData | null;
            set mask(value: Container | MaskData | null);
        }
        enum MASK_TYPES {
            NONE = 0,
            SCISSOR = 1,
            STENCIL = 2,
            SPRITE = 3,
            COLOR = 4,
        }
        enum MSAA_QUALITY {
            NONE = 0,
            LOW = 2,
            MEDIUM = 4,
            HIGH = 8,
        }
        interface IFilterTarget {
            filterArea: Rectangle;
            getBounds(skipUpdate?: boolean): Rectangle;
        }
        interface IMaskTarget extends IFilterTarget {
            renderable: boolean;
            isSprite?: boolean;
            worldTransform: Matrix;
            isFastRect?(): boolean;
            getBounds(skipUpdate?: boolean, rect?: Rectangle): Rectangle;
            render(renderer: Renderer): void;
        }
        enum COLOR_MASK_BITS {
            RED = 1,
            GREEN = 2,
            BLUE = 4,
            ALPHA = 8,
        }
        class MaskData {
            type: MASK_TYPES;
            autoDetect: boolean;
            maskObject: IMaskTarget;
            pooled: boolean;
            isMaskData: boolean;
            resolution: number;
            multisample: MSAA_QUALITY;
            enabled: boolean;
            colorMask: COLOR_MASK_BITS;
            _filters: ISpriteMaskFilter[];
            _stencilCounter: number;
            _scissorCounter: number;
            _scissorRect: Rectangle;
            _scissorRectLocal: Rectangle;
            _colorMask: number;
            _target: IMaskTarget;
            constructor(maskObject?: IMaskTarget);
            get filter(): ISpriteMaskFilter;
            set filter(value: ISpriteMaskFilter);
            reset(): void;
            copyCountersOrReset(maskAbove?: MaskData): void;
        }
        class Container<T extends DisplayObject = DisplayObject> extends DisplayObject {
            static defaultSortableChildren: boolean;
            readonly children: T[];
            sortableChildren: boolean;
            sortDirty: boolean;
            parent: Container;
            containerUpdateTransform: () => void;
            constructor();
            addChild<U extends T[]>(...children: U): U[0];
            addChildAt<U extends T>(child: U, index: number): U;
            swapChildren(child: T, child2: T): void;
            getChildIndex(child: T): number;
            setChildIndex(child: T, index: number): void;
            getChildAt(index: number): T;
            removeChild<U extends T[]>(...children: U): U[0];
            removeChildAt(index: number): T;
            removeChildren(beginIndex?: number, endIndex?: number): T[];
            sortChildren(): void;
            updateTransform(): void;
            calculateBounds(): void;
            getLocalBounds(rect?: Rectangle, skipChildrenUpdate?: boolean): Rectangle;
            render(renderer: Renderer): void;
            destroy(options?: IDestroyOptions | boolean): void;
            get width(): number;
            set width(value: number);
            get height(): number;
            set height(value: number);
        }
        interface IDestroyOptions {
            children?: boolean;
            texture?: boolean;
            baseTexture?: boolean;
        }
        class ObservablePoint<T = any> implements IPoint {
            cb: (this: T) => any;
            scope: any;
            _x: number;
            _y: number;
            constructor(cb: (this: T) => any, scope: T, x?: number, y?: number);
            clone(cb?: (this: T) => any, scope?: any): ObservablePoint;
            set(x?: number, y?: number): this;
            copyFrom(p: IPointData): this;
            copyTo<T extends IPoint>(p: T): T;
            equals(p: IPointData): boolean;
            toString(): string;
            get x(): number;
            set x(value: number);
            get y(): number;
            set y(value: number);
        }
        class Transform {
            static readonly IDENTITY: Transform;
            worldTransform: Matrix;
            localTransform: Matrix;
            position: ObservablePoint;
            scale: ObservablePoint;
            pivot: ObservablePoint;
            skew: ObservablePoint;
            _parentID: number;
            _worldID: number;
            toString(): string;
            updateLocalTransform(): void;
            updateTransform(parentTransform: Transform): void;
            setFromMatrix(matrix: Matrix): void;
            get rotation(): number;
            set rotation(value: number);
        }
        class Matrix {
            a: number;
            b: number;
            c: number;
            d: number;
            tx: number;
            ty: number;
            array: Float32Array | null;
            constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
            fromArray(array: number[]): void;
            set(a: number, b: number, c: number, d: number, tx: number, ty: number): this;
            toArray(transpose: boolean, out?: Float32Array): Float32Array;
            apply<P extends IPointData = Point>(pos: IPointData, newPos?: P): P;
            applyInverse<P extends IPointData = Point>(pos: IPointData, newPos?: P): P;
            translate(x: number, y: number): this;
            scale(x: number, y: number): this;
            rotate(angle: number): this;
            append(matrix: Matrix): this;
            setTransform(
                x: number,
                y: number,
                pivotX: number,
                pivotY: number,
                scaleX: number,
                scaleY: number,
                rotation: number,
                skewX: number,
                skewY: number
            ): this;
            prepend(matrix: Matrix): this;
            decompose(transform: Transform): Transform;
            invert(): this;
            identity(): this;
            clone(): Matrix;
            copyTo(matrix: Matrix): Matrix;
            copyFrom(matrix: Matrix): this;
            toString(): string;
            static get IDENTITY(): Matrix;
            static get TEMP_MATRIX(): Matrix;
        }
        class Rectangle {
            x: number;
            y: number;
            width: number;
            height: number;
            readonly type: SHAPES.RECT;
            constructor(
                x?: string | number,
                y?: string | number,
                width?: string | number,
                height?: string | number
            );
            get left(): number;
            get right(): number;
            get top(): number;
            get bottom(): number;
            static get EMPTY(): Rectangle;
            clone(): Rectangle;
            copyFrom(rectangle: Rectangle): Rectangle;
            copyTo(rectangle: Rectangle): Rectangle;
            contains(x: number, y: number): boolean;
            intersects(other: Rectangle, transform?: Matrix): boolean;
            pad(paddingX?: number, paddingY?: number): this;
            fit(rectangle: Rectangle): this;
            ceil(resolution?: number, eps?: number): this;
            enlarge(rectangle: Rectangle): this;
            toString(): string;
        }
    }
}
export type {};
