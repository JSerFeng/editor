import { FC, useState } from "react"
import ShopItem from "./components/ShopItem"
import "./style.scss"
import { apiGetShopCategory } from "../../api"
import { useRequest } from "../../utils/hooks"
import { QueryBody } from "../../api/request"

const Shop: FC = () => {
	const [query, setQuery] = useState<QueryBody>({
		page: 1,
	});
	const categories = useRequest(apiGetShopCategory, query);

	return (
		<div className="shop">
			<h3 className="shop-title" style={ { fontWeight: 100 } }>为你推荐</h3>
			<div className="shop-categories">
				{ categories && Array.isArray(categories) && categories.map((category) => {
					return <ShopItem category={ category } />
				}) }
			</div>
			<h3 className="shop-title">热门模板</h3>

		</div>
	)
}

export default Shop
