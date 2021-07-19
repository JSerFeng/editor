/// <reference types="react" />
import { ReactComp, WidgetConfig, WidgetConfigProp, WidgetDescription, WidgetPackage, WidgetProps } from "./interfaces";
declare type WidgetsMap = Map<string, WidgetPackage>;
declare class WidgetsCenter {
    widgetsMap: WidgetsMap;
    subQueue: ((...args: any[]) => any)[];
    constructor(initMap?: WidgetsMap);
    static createConfig(info: WidgetDescription): {
        pos: import("./interfaces").Pos;
        name: string;
        showName: string;
        editorConfig: ({
            key: string;
            name: string;
            type: import("./interfaces").EditorTypes.Color;
        } | {
            key: string;
            name: string;
            type: import("./interfaces").EditorTypes.Upload;
            options: Record<string, any>;
        } | {
            key: string;
            name: string;
            type: import("./interfaces").EditorTypes.Text;
        } | {
            key: string;
            name: string;
            type: import("./interfaces").EditorTypes.Number;
        } | {
            key: string;
            name: string;
            type: import("./interfaces").EditorTypes.Select;
            options: {
                label: string;
                value: string;
            }[];
        })[];
        config: any;
        initPos?: import("./interfaces").Pos | undefined;
        version?: string | undefined;
        from?: string | undefined;
        style?: Partial<import("react").CSSProperties> | undefined;
        snapShot?: string | undefined;
        description?: string | undefined;
        dependencies?: Record<string, string> | undefined;
    };
    use(widgets: WidgetPackage | WidgetPackage[]): void;
    notify(): void;
    subscribe(cb: (all: WidgetPackage[]) => any): void;
    get(widgetConfig: WidgetConfig | string): WidgetPackage | null;
    getAll(): WidgetPackage[];
    create(widgetName: string): WidgetConfig | null;
}
export default WidgetsCenter;
export declare const createPkg: <T = any>(Comp: ReactComp<WidgetProps<T>>, options: WidgetDescription<T>, Configuration?: ReactComp<WidgetConfigProp<T>> | undefined) => WidgetPackage;
