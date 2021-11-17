import { ReactComp, WidgetConfig, WidgetConfigProp, WidgetDescription, WidgetPackage, WidgetProps } from "./interfaces";
declare type WidgetsMap = Map<string, WidgetPackage>;
export declare type HooksCallback = (pkg: WidgetPackage) => (WidgetPackage);
export declare class WidgetsCenter {
    widgetsMap: WidgetsMap;
    subQueue: ((...args: any[]) => any)[];
    preHooks: Set<HooksCallback>;
    constructor(initMap?: WidgetsMap);
    createConfigFromDescription(info: WidgetDescription): WidgetConfig;
    use(widget: WidgetPackage): void;
    remove(name: string): void;
    unPre(cb: HooksCallback): void;
    notify(): void;
    subscribe(cb: (all: WidgetPackage[]) => any): void;
    get(widgetConfig: WidgetConfig | string): WidgetPackage | null;
    getAll(): WidgetPackage<any>[];
    pre(cb: HooksCallback): void;
    createConfigFromName(widgetName: string): WidgetConfig | null;
}
export declare const defaultDescription: Required<WidgetDescription>;
export declare const createPkg: <T = any>(Comp: ReactComp<WidgetProps<T>>, getDescription: (...args: any) => WidgetDescription<T>, Configuration?: ReactComp<WidgetConfigProp<T>> | undefined) => WidgetPackage;
export {};
