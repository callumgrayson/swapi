import React from 'react';
import { getUrlInfo } from '../helpers/helpers';
import LoaderForItem from '../displays/LoaderForItem';
import { prepareItemData } from '../helpers/prepareItemData';
import './Detail.css';

const uuid = require('uuid/v4');

const Detail = (props) => {
	const {
		currentCategory,
		currentItem,
		itemData,
		pageItems,
		isFetching
	} = props;
	const inData = { ...itemData };

	const detailData = prepareItemData(inData);

	if (isFetching) {
		return <div />;
	}

	// if (
	// 	(currentItem &&
	// 		pageItems &&
	// 		pageItems.length > 0 &&
	// 		!Object.values(pageItems)
	// 			.map((i) => i.itemId)
	// 			.includes(currentItem)) ||
	// 	(currentCategory &&
	// 		itemData.hasOwnProperty('url') &&
	// 		getUrlInfo(itemData.url[0].url)[0] !== currentCategory)
	// ) {
	// 	return <div className="v6_detail" />;
	// }

	return (
		<div className="v6_detail">
			<div>
				{Object.entries(detailData).map((el) => {
					console.log('el', el);
					// el is an object
					if (Array.isArray(el[1])) {
						return (
							<div key={uuid()} className="v6_keyValArray">
								<div className="v6_above">{el[0]}</div>
								<div className="v6_below">
									{el[1].map((valInside) => {
										return (
											<div
												key={uuid()}
												className="v6_array-single"
												onClick={() =>
													console.log(
														'needs a handler...'
													)}
											>
												{valInside.isFetching && (
													<LoaderForItem
														item={valInside}
													/>
												)}
												{!valInside.isFetching && (
													<div>
														{valInside.itemName}
													</div>
												)}
											</div>
										);
									})}
								</div>
							</div>
						);
					} else if (el[0] === 'Name') {
						return (
							<div key={uuid()} className="v6_nameBox">
								<div className="v6_above">{el[1]}</div>
							</div>
						);
					} else {
						return (
							<div
								key={uuid()}
								className={`${el[0] === 'Opening Crawl'
									? 'v6_openingCrawl'
									: 'v6_keyValBox'}`}
							>
								<div
									className={`${el[0] === 'Opening Crawl'
										? 'v6_above'
										: 'v6_left'}`}
								>
									{el[0]}
								</div>
								<div
									className={`${el[0] === 'Opening Crawl'
										? 'v6_below'
										: 'v6_right'}`}
								>
									{el[1]}
								</div>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};

export default Detail;
