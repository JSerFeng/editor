import {
	Button,
	Modal
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { FC, useEffect, useRef, useState } from "react";
import { connect } from "react-redux"
import FileExplorer from "../../components/file-explorer"
import {
	apiGenerate, ErrorCode
} from "../../api";
import { RenderConfig } from "@v-editor/widgets-center";
import { BaseState } from "../../store";
import {
	useHistory
} from "react-router-dom"

import "./fileExplorer.scss"
import Confirm from "../../components/confirm";


enum GeneratorState {
	None,
	CheckConfirm,
	Generating,
	GenFail,
	GenSuccess
}

const Generator: FC<{
	renderConfig: RenderConfig
}> = ({ renderConfig }) => {
	const [genState, setGenState] = useState(GeneratorState.None)
	const [dir, setDir] = useState("")
	const fileExplorer = useRef<{ refresh: () => void }>(null)

	const router = useHistory()

	const handleRouteBack = () => {
		router.push("/editor")
	}

	const handleConfirm = async (dir: string) => {
		setDir(dir)
		setGenState(GeneratorState.CheckConfirm)
	}

	useEffect(() => {
		if (genState === GeneratorState.Generating) {
			// @ts-ignore
      apiGenerate(renderConfig, dir)
          // @ts-ignore
          .then((res) => {
					if (res.code !== ErrorCode.Success) {
						setGenState(GeneratorState.GenFail)
						return
					}
					setGenState(GeneratorState.GenSuccess)
					fileExplorer.current!.refresh()
				})
		}
	}, [dir, genState, renderConfig])

	return (
		<>
			<div className="generator flex">
				{
					<>
						<div>
							<Button
								onClick={ handleRouteBack }
								variant="outlined"
								color="primary"
							>
								<ArrowBackIos />编辑器
							</Button>
						</div>
						<FileExplorer
							ref={ fileExplorer }
							onConfirm={ handleConfirm }
							confirmText="开始生成源代码"
						/>
					</>
				}
			</div>

			<Confirm
				open={ genState === GeneratorState.CheckConfirm }
				render={ "项目: " + renderConfig.projectName + "\n源代码将生成在目录 " + dir + "下， 是否确定" }
				onConfirm={ setGenState.bind(null, GeneratorState.Generating) }
				onCancel={ setGenState.bind(null, GeneratorState.None) }
			/>

			<Modal
				open={ [GeneratorState.Generating, GeneratorState.GenSuccess, GeneratorState.GenSuccess].includes(genState) }
				onClose={ () => {
					setGenState(GeneratorState.None)
				} }>
				<div className="modal" style={ {
					width: "fit-content",
					height: "fit-content"
				} }>
					{
						genState === GeneratorState.Generating
							? "正在生成代码中（第一次会有点慢）..."
							: genState === GeneratorState.GenSuccess
								? "生成代码成功🎉！！"
								: "生成代码失败😢"
					}
				</div>
			</Modal>
		</>
	)
}

export default connect(
	(state: BaseState) => ({
		renderConfig: state.editorReducer.workplace.renderConfig
	})
)(Generator)
