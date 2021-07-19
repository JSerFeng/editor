import { FC } from "react";
import {
	Link
} from "react-router-dom"
import { WidgetProps } from "../../render/interfaces";
import { LinkProps } from "./schema";

export const RouterLink: FC<WidgetProps<LinkProps>> = ({ config, isDev, pos }) => {

	return isDev
		? (
			<div style={ {
				position: "relative",
				border: "1px solid grey",
				width: "100%",
				height: "100%"
			} }>
			</div>
		)
		: (
			<Link to={ config.to }>
				<div style={ {
					position: "relative",
					width: pos.w + "px",
					height: pos.h + "px"
				} }>
				</div>
			</Link>
		)
}