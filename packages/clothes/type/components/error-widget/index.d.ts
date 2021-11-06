import { PureComponent } from "react";
interface P {
    name?: string;
}
interface S {
    error: any;
}
declare class ErrorCatch extends PureComponent<P, S> {
    constructor(props: {
        name: string;
    });
    componentDidCatch(e: any): void;
    render(): import("react").ReactNode;
}
export default ErrorCatch;
