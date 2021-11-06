/// <reference types="react" />
import "./style.scss";
declare const _default: import("react-redux").ConnectedComponent<import("react").ForwardRefExoticComponent<{
    onConfirm(dir: string): void;
    confirmText?: string | undefined;
} & import("react").RefAttributes<{
    refresh: () => void;
}>>, import("react-redux").Omit<{
    onConfirm(dir: string): void;
    confirmText?: string | undefined;
} & import("react").RefAttributes<{
    refresh: () => void;
}>, never>>;
export default _default;
