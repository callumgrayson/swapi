import React from 'react';
import { capitalize } from '../helpers/helpers';

const uuid = require('uuid/v4');

const prepareDetail = (inObj) => {
	let outObj = {};
	Object.keys(inObj).forEach((key) => {
		// let newKey = removeUnderscores(key);
		let newKey = key.split('_').map((word) => capitalize(word)).join(' ');
		outObj[newKey] = inObj[key];
	});
	// console.log('outObj', outObj);
	return outObj;
};

const Detail = (props) => {
	const {
		// currentItem,
		itemData
	} = props;
	const inData = itemData;

	const detailData = prepareDetail(inData);

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
												className={
													valInside.itemName ? (
														'visible'
													) : (
														'hidden'
													)
												}
												onClick={() =>
													console.log(
														'needs a handler...'
													)}
											>
												{valInside.itemName || '...'}
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
