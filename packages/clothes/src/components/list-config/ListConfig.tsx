import { FC, ReactElement, useState } from "react"
import { List, ListItem, IconButton, Input, Button, Grid } from "@material-ui/core"
import { AddOutlined, BorderColor, Delete, Close } from "@material-ui/icons"
import produce from "immer"


interface ConfigListProps<T = string> {
	data: T[]
	onChange: (newData: T[]) => void,
	render?(data: T, i: number): ReactElement
}

const ConfigList: FC<ConfigListProps> = ({ data, onChange, render }) => {
	const [activeSelected, setActiveSelected] = useState(-1)
	const [hover, setHover] = useState(-1)
	const [value, setValue] = useState("")
	const [openNewItem, setOpen] = useState(false)

	const handleOpenAdd = () => {
		setOpen(true)
		setValue("")
	}

	const handleEdit = (val: string, idx: number) => {
		setValue(val)
		setActiveSelected(idx)
	}

	const handleDelete = (idx: number) => {
		onChange(produce(data, it => {
			it.splice(idx, 1)
		}))
	}

	return (
		<Grid className="list-config">
			<List>
				{
					data.map((item, i) => (
						<ListItem key={ i }>
							<Grid
								container
								onMouseEnter={ setHover.bind(null, i) }
								onMouseLeave={ setHover.bind(null, -1) }
							>
								{
									activeSelected === i
										? <>
											<Grid item xs={ 8 }>
												<Input
													fullWidth
													value={ value }
													onChange={ e => { setValue(e.target.value) } } />
											</Grid>
											<Grid item xs={ 4 }>
												<Button
													color="primary"
													variant="contained"
													onClick={ () => {
														onChange(produce(data, it => {
															it[i] = value
														}))
														setActiveSelected(-1)
													} }
												>确定</Button>
												<Button
													variant="outlined"
													onClick={ () => {
														setActiveSelected(-1)
													} } >取消</Button>
											</Grid>
										</>
										: <>
											<Grid item xs={ 8 }>
												{ render ? render(item, i) : item }
											</Grid>
											{
												hover === i &&
												<Grid item xs={ 4 }>
													<IconButton onClick={ handleEdit.bind(null, item, i) }>
														<BorderColor />
													</IconButton>
													<IconButton color="secondary" onClick={ handleDelete.bind(null, i) }>
														<Delete />
													</IconButton>
												</Grid>
											}
										</>
								}
							</Grid>
						</ListItem>
					))
				}
				{ openNewItem &&
					<Grid>
						<Input value={ value } onChange={ e => {
							setValue(e.target.value)
						} } />
						<IconButton
							color="primary"
							onClick={ () => {
								onChange(produce(data, it => {
									it.push(value)
								}))
								setOpen(false)
							} } >
							<AddOutlined />
						</IconButton>
						<IconButton color="secondary" onClick={ setOpen.bind(null, false) }>
							<Close />
						</IconButton>
					</Grid>
				}
			</List>
			<IconButton color="primary" onClick={ handleOpenAdd }>
				<AddOutlined />添加
			</IconButton>
		</Grid>
	)
}

export default ConfigList
