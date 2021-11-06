/// <reference types="react" />
import { ReactComp, WidgetConfig, WidgetConfigProp, WidgetDescription, WidgetPackage, WidgetProps } from "./interfaces";
declare type WidgetsMap = Map<string, WidgetPackage>;
export declare type HooksCallbak = (pkg: WidgetPackage) => (WidgetPackage);
declare class WidgetsCenter {
    widgetsMap: WidgetsMap;
    subQueue: ((...args: any[]) => any)[];
    preHooks: Set<HooksCallbak>;
    constructor(initMap?: WidgetsMap);
    static createConfig(info: WidgetDescription): {
        pos: {
            w: number;
            h: number;
        } | {
            x: number;
            y: number;
            w: number;
            h: number;
        };
        name: string;
        showName: string;
        editorConfig: ({
            key: string;
            name: string;
            type: any;
            options: Record<string, any> | {
                label: string;
                value: string;
            }[];
        } | {
            key: string;
            name: string;
            type: any;
        })[];
        config: any;
        initPos?: {
            w: number;
            h: number;
        } | undefined;
        version?: string | undefined;
        from?: string | undefined;
        style?: Partial<import("react").CSSProperties> | undefined;
        snapShot?: string | undefined;
        description?: string | undefined;
        dependencies?: Record<string, string> | undefined;
    };
    use(widget: WidgetPackage): void;
    remove(name: string): void;
    unPre(cb: HooksCallbak): void;
    notify(): void;
    subscribe(cb: (all: WidgetPackage[]) => any): void;
    get(widgetConfig: WidgetConfig | string): WidgetPackage<any> | null;
    getAll(): WidgetPackage<any>[];
    pre(cb: HooksCallbak): void;
    create(widgetName: string): WidgetConfig | null;
}
export default WidgetsCenter;
export declare const createPkg: <T = any>(Comp: ReactComp<WidgetProps<T>>, options: WidgetDescription<T>, Configuration?: ReactComp<WidgetConfigProp<T>> | undefined) => WidgetPackage;
