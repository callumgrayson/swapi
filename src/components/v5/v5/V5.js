import React, { useState, useEffect } from 'react';
import useSwApi from '../hooks/useSwApi';
import allIdsArray from '../helpers/allIdsArray.json';

import './V5.css';
const uuid = require('uuid/v4');

const V5 = () => {
	const [ listSingles, setListSingles ] = useState([]);
	const [ data, setRequestForSingles ] = useSwApi();

	useEffect(
		() => {
			if (Object.keys(listSingles).length > 0) {
				setRequestForSingles(listSingles);
			}
		},
		[ listSingles, setRequestForSingles ]
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

		const getSingleContent = () => {
			if (props) {
				const { data: inData, error, isFetching } = props;

				if (isFetching === true) {
					return <div>...loading...</div>;
				} else if (error && error !== '') {
					return <div>Error: {error}</div>;
				} else if (inData && Object.keys(inData).length > 0) {
					return <div>{inData.name}</div>;
				}
			} else {
				return <div>Nothing to show yet...</div>;
			}
		};

		return <div className="single">{getSingleContent()}</div>;
	};

	function renderIdItem(inItem, inData) {
		const { category: itemCat, idNumber: itemNum, id: itemId } = inItem;
		const displayItem = inData[itemCat].items[itemId];

		// if relevant data is in inData
		if (inData[itemCat].items.hasOwnProperty(itemId)) {
			// use inData in return

			return (
				<div
					key={uuid()}
					className="v5_single-item"
					onClick={() => console.log('inItem', inItem)}
				>
					{renderSingle(displayItem)}
				</div>
			);
		} else {
			// else use inItem in return

			return (
				<div
					key={uuid()}
					className="v5_single-item"
					onClick={() =>
						setListSingles([
							{
								category: itemCat,
								itemNumber: itemNum
							}
						])}
				>
					{inItem.idNumber}
				</div>
			);
		}
	}

	function renderNumberButtons(inArray) {
		return inArray.map((cat) => {
			let catName = cat[0].category;
			return (
				<div key={uuid()}>
					<div>{catName}</div>
					<div className="v5_singles-box">
						{cat.map((idItem) => renderIdItem(idItem, data))}
					</div>
				</div>
			);
		});
	}

	return (
		<div>
			<div>Fetching single items</div>
			{renderNumberButtons(allIdsArray)}
		</div>
	);
};

export default V5;
