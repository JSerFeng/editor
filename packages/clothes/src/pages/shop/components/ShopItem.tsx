import { FC } from "react"
import "./shopItem.scss"
import { ShopCategory } from "../../../api/index"
const ShopItem: FC<{
	category: ShopCategory
}> = ({ category }) => {
	return (
		<div className="shop-item">
			<div
				className="shop-item-unit tl"
				style={ {
					backgroundColor: category.bgColor,
					backgroundImage: category.bgImage,
				} }>
				<h3 className="title">{ category.category }</h3>
				<div>发布于：{ new Date(category.lastModified).toLocaleString() }</div>
			</div>
			<div className="shop-item-unit tm1" style={ { backgroundImage: `url(${category.pics[1]})` } }></div>
			<div className="shop-item-unit tm2" style={ { backgroundImage: `url(${category.pics[2]})` } }></div>
			<div className="shop-item-unit tr" style={ { backgroundImage: `url(${category.pics[0]})` } }></div>
			<div className="shop-item-unit b1" style={ { backgroundImage: `url(${category.pics[3]})` } }></div>
			<div className="shop-item-unit b2" style={ { backgroundImage: `url(${category.pics[4]})` } }></div>
			<div className="shop-item-unit b3" style={ { backgroundImage: `url(${category.pics[5]})` } }></div>
			<div className="shop-item-unit b4" style={ { backgroundImage: `url(${category.pics[6]})` } }></div>
			<div className="shop-item-unit b5" style={ { backgroundImage: `url(${category.pics[7]})` } }></div>
		</div>
	)
}

export default ShopItem
