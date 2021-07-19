import {
	Input,
	IconButton,
	Button,
	CircularProgress,
	Modal
} from "@material-ui/core";
import { Folder, ArrowBackIos } from "@material-ui/icons";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { connect } from "react-redux"
import {
	apiDirCwd,
	ErrorCode,
	apiDirList,
	apiDirBack,
	apiDirEnter,
	apiDirCreate,
	apiDirRemove,
} from "../../api";
import { BaseState } from "../../store";

import "./style.scss"


const FileExplorer = forwardRef<
	{
		refresh: () => void
	},
	{
		onConfirm(dir: string): void
		confirmText?: string
	}
>(({ onConfirm, confirmText }, ref) => {
	const [dirList, setDirList] = useState<({ isDir: boolean, name: string }[]) | null>([])
	const [selected, setSelected] = useState(-1)
	const [cwd, setCwd] = useState<string | null>("")
	const doubleClick = useRef<number | null>(null)
	const [openCreate, setOpenCreate] = useState(false)
	const [createdDirName, setCreatedDirName] = useState("")
	const [openRemoveDir, setOpenRemoveDir] = useState(false)

	const init = useCallback(async () => {
		const res = await apiDirCwd()
		if (res.code !== ErrorCode.Success) {
			setCwd(null)
		}
		setCwd(res.data.dir)
		return res.data.dir
	}, [])

	const reqDirList = (cwd: string) => {
		apiDirList(cwd)
			.then(res => {
				if (res.code === ErrorCode.Success) {
					setDirList(res.data.dirList)
				}
			})
	}

	useImperativeHandle(ref, () => ({
		refresh: reqDirList.bind(null, cwd!)
	}))


	useEffect(() => {
		init()
	}, [init])

	useEffect(() => {
		if (cwd) {
			reqDirList(cwd)
		}
	}, [cwd])


	let timer: number
	const handleSelect = (dir: { isDir: boolean, name: string }, i: number) => {
		if (doubleClick.current === i) {
			handleEnter()
		} else {
			clearTimeout(timer)
			timer = window.setTimeout(() => {
				doubleClick.current = null
			}, 500)
			doubleClick.current = dir.isDir ? i : selected
		}
		setSelected(dir.isDir ? i : selected)
	}

	const handleEnter = async () => {
		if (selected >= 0) {
			const { name } = dirList![selected] || { name: "" }
			const res = await apiDirEnter(cwd!, name)
			if (res.code !== ErrorCode.Success) {
				return
			}
			setCwd(res.data.dir)
			setSelected(-1)
		}
	}

	const handleBack = async () => {
		if (cwd) {
			const res = await apiDirBack(cwd)
			if (res.code !== ErrorCode.Success) {
				return
			}
			setCwd(res.data.dir)
			setSelected(-1)
		}
	}

	const handleNewDirectory = async () => {
		if (cwd) {
			await apiDirCreate(cwd, createdDirName)
			const { code, data } = await apiDirList(cwd)
			if (code !== ErrorCode.Success) {
				return
			}
			setOpenCreate(false)
			setDirList(data.dirList)
		}
	}

	const handleRemoveDir = async () => {
		if (selected >= 0 && cwd && dirList) {
			const res = await apiDirRemove(cwd, dirList[selected]!.name)
			if (res.code !== ErrorCode.Success) {
				return
			}
			await reqDirList(cwd)
			setSelected(-1)
			setOpenRemoveDir(false)
		}
	}

	const handleConfirm = async () => {
		let dir: string
		if (selected >= 0) {
			const res = await apiDirEnter(cwd!, dirList![selected].name)
			if (res.code !== ErrorCode.Success) {
				return
			}
			dir = res.data.dir
		} else {
			dir = cwd!
		}
		onConfirm(dir)
	}

	return (
		<>
			<div className="file-explorer">
				{
					cwd
						? (
							<div>
								<div className="header flex">
									<IconButton onClick={ handleBack }>
										<ArrowBackIos />
									</IconButton>
									<div style={ { width: "50%" } }>
										<Input fullWidth value={ cwd } onChange={ e => {
											setCwd(e.target.value)
											setSelected(-1)
										} } />
									</div>
								</div>
								<ul className="dir-list">
									{
										dirList?.map((dir, i) => {
											return (
												<li
													key={ i }
													className={
														"item flex ac " +
														(dir.isDir ? "dir" : "file") + " " +
														(selected === i ? "active" : "")
													}
													onClick={ handleSelect.bind(null, dir, i) }
												>
													{
														dir.isDir
															? <Folder />
															: null
													}
													{ dir.name }
												</li>
											)
										})
									}
								</ul>
								<div className="footer flex jb">
									<div>
										<Button
											color="primary" variant="contained"
											onClick={ handleConfirm }
										>
											{ confirmText || "确定" }
										</Button>
										<Button
											color="primary" variant="outlined"
											onClick={ handleEnter }
										>进入</Button>
									</div>
									<Button color="primary" variant="contained"
										onClick={ setOpenCreate.bind(null, true) }
									>新建文件夹</Button>
									<Button color="primary" variant="contained"
										onClick={ setOpenRemoveDir.bind(null, true) }
									>删除文件夹</Button>
								</div>
							</div>
						)
						: (
							<div className="flex jc ac">
								<CircularProgress />
							</div>
						)
				}
			</div>


			<Modal
				open={ openRemoveDir }
				onClose={ setOpenRemoveDir.bind(null, false) }
			>
				<div className="modal flex jc ac " style={ {
					width: "50%",
					height: "fit-content"
				} }>
					{
						dirList && selected >= 0
							? (
								<div>
									<h3>你确定要删除目录 { dirList[selected].name } ? &nbsp;</h3>
									<Button color="secondary" variant="contained"
										onClick={ handleRemoveDir }
									>确定删除</Button>
									<Button color="primary" variant="outlined" onClick={ setOpenRemoveDir.bind(null, false) }>取消</Button>
								</div>
							)
							: <h3>未选中任何文件夹</h3>
					}
				</div>
			</Modal>

			<Modal
				open={ openCreate }
				onClose={ setOpenCreate.bind(null, false) }
			>
				<div className="modal" style={ {
					width: "50%",
					height: "fit-content"
				} }>
					<h3>输入文件夹名</h3>
					<Input value={ createdDirName } fullWidth onChange={
						e => {
							setCreatedDirName(e.target.value)
						}
					} />
					<div style={ { marginBottom: "10px" } }></div>
					<Button color="primary" variant="contained"
						onClick={ handleNewDirectory }
					>创建</Button>
				</div>
			</Modal>
		</>
	)
})

export default connect(
	(state: BaseState) => ({
		renderConfig: state.editorReducer.workplace.renderConfig
	})
)(FileExplorer)
