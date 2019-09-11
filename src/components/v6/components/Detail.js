import React from 'react';
import { urlCatsByTerm } from '../helpers/helpers';

const Detail = (props) => {
	// console.log('props', props);
	const { currentItem, itemData } = props;
	const detailData = itemData;
	// return (
	// 	<div>
	// 		{itemData &&
	// 			itemData.hasOwnProperty['name'] &&
	// 			JSON.stringify(itemData)}
	// 	</div>
	// );

	const renderPreparedDetail = (inObj) => {
		// console.log('in renderPreparedDetail...');

		const keyConvert = [ 'pilots', 'residents', 'characters' ];

		let singles = [];
		let arrays = [];

		Object.keys(inObj).forEach((keyInObj) => {
			if ([ 'created', 'edited', 'url' ].includes(keyInObj)) {
				return;
			}
			if (keyInObj === 'name') {
				singles.unshift({ [keyInObj]: inObj[keyInObj] });
			} else if (urlCatsByTerm.includes(keyInObj)) {
				let dataKey = keyInObj;
				if (keyConvert.includes(keyInObj)) {
					dataKey = 'people';
				}
				if (keyInObj === 'homeworld') {
					dataKey = 'planets';
				}
				let arrayItems = inObj[keyInObj];
				let returnItems = [];
				arrayItems.forEach((item) => {
					returnItems.push({ name: '', id: item });
				});
				arrays.push({ [keyInObj]: [ ...returnItems ] });
			} else {
				singles.push({ [keyInObj]: inObj[keyInObj] });
			}
		});

		return [ ...singles, ...arrays ];
	};

	return (
		<div>
			<div>
				{Object.entries(detailData).map((el) => {
					// el is an object
					console.log('el', el);
					if (Array.isArray(el[1])) {
						console.log('el[1]', el[1]);
						return (
							<div className="v4_keyValBox">
								<div className="v4_left">{el[0]}</div>
								<div className="v4_right">
									{el[1].map((valInside) => {
										return (
											<div
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
							<div className="v4_keyValBox">
								<div className="v4_left">{el[0]}</div>
								<div className="v4_right">{el[1]}</div>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};

export default Detail;
