/* eslint-disable @typescript-eslint/ban-types */
type BusClass = {
    emit: (name: string) => void
    on: (name: string, callback: Function) => void
}
type List = {
    [key: string]: Array<Function>
}
class Bus implements BusClass {
    list: List
    constructor() {
        this.list = {}
    }
    emit(name: string, ...args: Array<any>) {
        this.list[name] = this.list[name] || []
        const eventName: Array<Function> = this.list[name]
        eventName.forEach(ev => {
            ev.apply(this, args)
        })
    }
    on(name: string, callback: Function) {
        const fn: Array<Function> = this.list[name] || [];
        fn.push(callback)
        this.list[name] = fn
    }
}
 
export default new Bus()