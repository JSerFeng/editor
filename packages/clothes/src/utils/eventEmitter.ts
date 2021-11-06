export type EventEmitterFn = (...args: any) => any

export default class EventEmitter {
  subMap: Map<string, EventEmitterFn[]>
  constructor() {
    this.subMap = new Map()
  }

  on(eventName: string, callback: EventEmitterFn) {
    let cbs: EventEmitterFn[] | undefined
    if ((cbs = this.subMap.get(eventName))) {
      cbs.push(callback)
    } else {
      this.subMap.set(eventName, [callback])
    }
  }

  emit(eventName: string, ...args: any[]) {
    let cbs: EventEmitterFn[] | undefined
    if ((cbs = this.subMap.get(eventName))) {
      for (const cb of cbs) {
        cb(...args)
      }
    }
  }
}