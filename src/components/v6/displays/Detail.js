import React from 'react';
import { capitalize, getUrlInfo } from '../helpers/helpers';
import LoaderForItem from '../displays/LoaderForItem';

const uuid = require('uuid/v4');

const prepareDetail = (inObj) => {
	let outObj = {};
	Object.keys(inObj).forEach((key) => {
		// let newKey = removeUnderscores(key);
		let newKey = key.split('_').map((word) => capitalize(word)).join(' ');
		outObj[newKey] = inObj[key];
	});
	return outObj;
};

const Detail = (props) => {
	const { currentCategory, currentItem, itemData, pageItems } = props;
	const inData = itemData;

	const detailData = prepareDetail(inData);

	if (
		(currentItem &&
			pageItems &&
			pageItems.length > 0 &&
			!Object.values(pageItems)
				.map((i) => i.itemId)
				.includes(currentItem)) ||
		(currentCategory &&
			itemData.hasOwnProperty('url') &&
			getUrlInfo(itemData.url[0].url)[0] !== currentCategory)
	) {
		return <div className="v6_detail" />;
	}

	return (
		<div className="v6_detail">
			<div>
				{Object.entries(detailData).map((el) => {
					// el is an object
					if (Array.isArray(el[1])) {
						return (
							<div key={uuid()} className="v6_keyValBox">
								<div className="v6_left">{el[0]}</div>
								<div className="v6_right">
									{el[1].map((valInside) => {
										return (
											<div
												key={uuid()}
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
													<div className="v6_right-single">
														{valInside.itemName}
													</div>
												)}
											</div>
										);
									})}
								</div>
							</div>
						);
					} else {
						return (
							<div key={uuid()} className="v6_keyValBox">
								<div className="v6_left">{el[0]}</div>
								<div className="v6_right">{el[1]}</div>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};

export default Detail;
