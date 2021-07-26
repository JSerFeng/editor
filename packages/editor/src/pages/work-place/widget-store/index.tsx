import { Grid, CircularProgress } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import { FC, useEffect, useState } from "react"
import { apiGetAllWidgets, ErrorCode, WidgetPO } from "../../../api"
import { QUERY_PAGE_NUM } from "../../../constants/common"
import WidgetSearch from "./widget-search"
import WidgetCard from "./widget-card"

import "./style.scss"

const WidgetStore: FC = () => {
	const [widgetsList, setWidgetsList] = useState<WidgetPO[]>([])
	const [loading, setLoading] = useState(false)
	const [kwd, setKwd] = useState("")
	const [pageInfo, setPageInfo] = useState({
		page: 1,
		num: QUERY_PAGE_NUM,
		totalPages: 1,
		totalNum: 0
	})

	const handlePageChange = (_: any, page: number) => {
		refreshList(page);
	}

	const refreshList = async (page: number) => {
		setLoading(true)
		const res = await apiGetAllWidgets(page, kwd)
		setLoading(false)
		if (res.code !== ErrorCode.Success) {
			return
		}
		const { totalNum, totalPages, widgets } = res.data
		setPageInfo(it => {
			it.page = page
			it.totalNum = totalNum
			it.totalPages = totalPages
			return it
		})
		setWidgetsList(widgets)
	}

	useEffect(() => {
		refreshList(1)
	}, [kwd])

	return (
		<div className="widget-store">
			<Grid container justifyContent="space-around" style={{
				position: "sticky",
				top: "0",
				backgroundColor: "#fff",
				zIndex: 1
			}}>
				<WidgetSearch kwd={ kwd } setKwd={ setKwd } />
			</Grid>
			<Grid container justifyContent="space-around">
				{
					loading
						? <CircularProgress />
						: widgetsList.map(item => (
							<WidgetCard key={ item._id } widget={ item } />
						))
				}
			</Grid>
			<Grid container justifyContent="center">
				<Pagination
					color="primary"
					count={ pageInfo.totalPages }
					page={ pageInfo.page }
					onChange={ handlePageChange } />
			</Grid>
		</div>
	)
}

export default WidgetStore
