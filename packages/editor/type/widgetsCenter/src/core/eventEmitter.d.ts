export declare type EventEmitterFn = (...args: any) => any;
export declare class EventEmitter {
    subMap: Map<string, EventEmitterFn[]>;
    constructor();
    on(eventName: string, callback: EventEmitterFn): void;
    emit(eventName: string, ...args: any[]): void;
}
