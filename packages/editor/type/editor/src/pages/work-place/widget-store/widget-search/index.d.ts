import { Dispatch, FC } from "react";
import "./search.scss";
declare const WidgetSearch: FC<{
    setKwd: Dispatch<string>;
    kwd: string;
}>;
export default WidgetSearch;
