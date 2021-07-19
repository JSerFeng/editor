import { RouterLink } from "./RouterLink";
import { createPkg } from "../../render/WidgetsCenter";
import { LinkProps } from "./schema";
import { EditorTypes } from "../../render/interfaces";

export default createPkg<LinkProps>(RouterLink, {
	name: "link",
	description: "在生成的代码后将看不到外边框\n",
	version: "0.0.1",
	showName: "路由链接",
	editorConfig: [
		{
			name: "导航地址",
			type: EditorTypes.Text,
			key: "to"
		}
	],
	config: {
		to: ""
	}
})