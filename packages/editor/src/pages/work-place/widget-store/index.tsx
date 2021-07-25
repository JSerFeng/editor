import { Grid } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import { FC, useEffect, useState } from "react"
import { apiGetAllWidgets, ErrorCode, WidgetPO } from "../../../api"
import { QUERY_PAGE_NUM } from "../../../constants/common"
import WidgetItem from "./item"

import "./style.scss"

const WidgetStore: FC = () => {
	const [widgetsList, setWidgetsList] = useState<WidgetPO[]>([])
	const [pageInfo, setPageInfo] = useState({
		page: 1,
		num: QUERY_PAGE_NUM,
		totalPages: 1,
		totalNum: 0
	})

	const handlePageChange = (_: any, page: number) => {
		setPageInfo(it => {
			it.page = page
			return it
		})
	}

	const refreshList = async (page: number) => {
		const res = await apiGetAllWidgets(page)
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
	}, [])

	return (
		<div className="widget-store">
			<Grid container>
				{
					widgetsList.map(item => (
						<WidgetItem widget={ item } />
					))
				}
			</Grid>
			<Grid container>
				<Pagination
					count={ pageInfo.totalPages }
					page={ pageInfo.page }
					onChange={ handlePageChange } />
			</Grid>
		</div>
	)
}

export default WidgetStore
