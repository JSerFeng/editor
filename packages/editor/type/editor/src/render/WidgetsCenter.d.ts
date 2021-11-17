import { ReactComp, WidgetConfig, WidgetConfigProp, WidgetDescription, WidgetPackage, WidgetProps } from "./interfaces";
declare type WidgetsMap = Map<string, WidgetPackage>;
export declare type HooksCallbak = (pkg: WidgetPackage) => (WidgetPackage);
declare class WidgetsCenter {
    widgetsMap: WidgetsMap;
    subQueue: ((...args: any[]) => any)[];
    preHooks: Set<HooksCallbak>;
    constructor(initMap?: WidgetsMap);
    createConfig(info: WidgetDescription): WidgetConfig;
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
