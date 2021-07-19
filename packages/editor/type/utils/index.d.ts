export declare enum StickFlags {
    NO_STICK = /**   */ 0,
    STICK_ROW = /**  */ 1,
    STICK_COL = /**  */ 2
}
interface RefLinesOptions {
    stickTo: StickFlags;
    showSelf: boolean;
    onlyNearest: boolean;
    stickPx: number;
    showPx: number;
}
/**返回值数组含义 [水平还是竖直, 参考线坐标, 是否是自己的坐标, 相距, 吸附后的left或top] */
export declare class RefLine {
    type: number;
    loc: number;
    isSelf: number;
    margin: number;
    stickLoc: number;
    constructor(type: number, loc: number, isSelf: number, margin: number, stickLoc: number);
}
export declare const createRefLine: ({ x: l, w: width, h: height, y: t }: {
    x: number;
    w: number;
    h: number;
    y: number;
}, others: ({
    x: number;
    y: number;
    w: number;
    h: number;
} | null)[], options?: Partial<RefLinesOptions> | undefined) => {
    refLines: RefLine[];
    left: number;
    top: number;
    sticks: {
        left: RefLine[];
        top: RefLine[];
        bottom: RefLine[];
        right: RefLine[];
    };
};
export declare const isUndef: (target: unknown) => target is null | undefined;
export declare function withConfirm(message: string, cb: () => void): void;
export declare function deepCopy<T>(obj: T): T;
/**获取到屏幕左边的距离 */
export declare function getOffsetLeft(node: HTMLElement | null): number;
/**获取到屏幕上边的距离 */
export declare function getOffsetTop(node: HTMLElement | null): number;
export declare function getNearestLine(arr: RefLine[], initValue?: RefLine): RefLine;
export {};
