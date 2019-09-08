import React, { useState, useEffect } from 'react';
import useSwApi from '../hooks/useSwApi';

import './V5.css';

function getItemId(category, itemNumber) {
	return `${category}_${itemNumber}`;
}

const V5 = () => {
	const [ listSingles, setListSingles ] = useState([]);
	const [ data, setRequestForSingles ] = useSwApi();

	useEffect(
		() => {
			if (Object.keys(listSingles).length > 0) {
				setRequestForSingles(listSingles);
			}
		},
		[ listSingles ]
	);

	const renderSingle = (props) => {
		// *****
		//
		// singleData should be an object in data
		// one for every id
		// isFetching: false
		// error: '',
		// data: {}
		//
		// *****

		// console.log('props', props);
		if (props) {
			const { data, error, isFetching } = props;

			if (isFetching === true) {
				return <div>...loading...</div>;
			} else if (error !== '') {
				return <div>Error: {error}</div>;
			} else if (Object.keys(data).length > 0) {
				return <div>{data.name}</div>;
			}
		} else {
			return <div>Nothing to show yet...</div>;
		}
	};

	const renderSinglesList = (inList, inData) => {
		// console.log('inList', inList);
		console.log('inData', inData);
		const list = inList.map((item) => {
			const { category, itemNumber } = item;
			const itemId = getItemId(category, itemNumber);
			// console.log('itemId', itemId);
			let singleData = inData[category].items[itemId];
			// console.log('singleData', singleData);
			return singleData;
		});

		return (
			<div className="v5_singles-list">
				{list.length > 0 &&
					list.map((single) => {
						return renderSingle(single);
					})}
			</div>
		);
	};

	const listSingles1 = [
		{
			category: 'people',
			itemNumber: 4
		},
		{
			category: 'starships',
			itemNumber: 11
		},
		{
			category: 'planets',
			itemNumber: 14
		}
	];

	return (
		<div>
			<button onClick={() => setListSingles(listSingles1)}>
				Get three singles: /people/4, /starships/11, planets/14
			</button>
			{renderSinglesList(listSingles, data)}
		</div>
	);
};

export default V5;
