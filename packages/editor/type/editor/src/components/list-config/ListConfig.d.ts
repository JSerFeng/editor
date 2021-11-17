import { FC, ReactElement } from "react";
interface ConfigListProps<T = string> {
    data: T[];
    onChange: (newData: T[]) => void;
    render?(data: T, i: number): ReactElement;
}
declare const ConfigList: FC<ConfigListProps>;
export default ConfigList;
