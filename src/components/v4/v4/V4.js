import React, { useEffect, useState } from 'react';

import './V4.css';

import allData from '../allData.json';

const urlCatsByTerm = [
	'characters',
	'films',
	'homeworld',
	'people',
	'pilots',
	'planets',
	'residents',
	'species',
	'starships',
	'vehicles'
];
const categories = [
	'films',
	'people',
	'planets',
	'species',
	'starships',
	'vehicles'
];

const idFromUrl = (url) => {
	// ** args: url<string>
	// ** return: id<string>

	if (typeof url === 'string') {
		const [ term, id ] = url
			.replace('https://swapi.co/api/', '')
			.split('/');

		return `${term}_${id}`;
	} else {
		console.log('url', url);
		return url;
	}
};

const extractIdsFromUrls = (urlsArray) => {
	// ** args: urls<array>
	// ** return: ids<array>

	if (Array.isArray(urlsArray)) {
		return urlsArray.map((url) => idFromUrl(url));
	} else {
		return [ idFromUrl(urlsArray) ];
	}
};

/////////////////////////////////////////////////////////////////////////
const V4 = () => {
	const [ term, setTerm ] = useState('');
	const [ page, setPage ] = useState(1);
	const [ dataId, setDataId ] = useState('');
	const [ requestIds, setRequestIds ] = useState([]);
	const [ data, setData ] = useState({});

	// Basic mechanism:
	// Have initial display buttons
	// When buttons are clicked to show "films" page "1"
	// function looks at data
	// if data does not have the required data it fetches it
	// if data has required data it sends it back for render

	useEffect(
		() => {
			let count;
			let pageIds = [];
			let results;
			let newTermObject = {};

			if (term === '' || page === 0) {
				return;
			}

			if (
				!(
					data.hasOwnProperty(term) &&
					data[term].hasOwnProperty(`page_${page}`)
				)
			) {
				// set count and results from allData
				// if (term !== '' && page !== 0) {
				count = allData[term].count;
				results = allData[term][page];
				// console.log('fetch triggered: ', term, page, dataId);
				// console.log('results', results);

				// results are in... Now set url data as ids
				results.forEach((result) => {
					const termId = idFromUrl(result.url);

					Object.keys(result).forEach((keyInResult) => {
						// extract url-containing data first
						if (urlCatsByTerm.includes(keyInResult)) {
							// extract urls from list
							let idsFromUrls = [ 'n/a' ];
							if (result[keyInResult]) {
								idsFromUrls = extractIdsFromUrls(
									result[keyInResult]
								);
							}

							// set data to newTermObject &
							newTermObject[termId] = {
								...newTermObject[termId]
							};
							newTermObject[termId][keyInResult] = idsFromUrls;
						} else {
							// and set non-url data as ids
							newTermObject[termId] = {
								...newTermObject[termId]
							};
							newTermObject[termId][keyInResult] =
								result[keyInResult];
						}
					});

					pageIds.push(termId);
				});

				setData((prev) => ({
					...prev,
					[term]: {
						...prev[term],
						count: count,
						[`page_${page}`]: [ ...pageIds ],
						...newTermObject
					}
				}));
			}
		},
		[ term, page ]
	);

	useEffect(
		() => {
			if (dataId === '') {
				return;
			}

			const setByDataId = ({ dataId, data, dataTerm }) => {
				// setter function simply takes the data and sets it in state
				// with appropriate checks...
				// console.log('dataId, data, dataTerm', dataId, data, dataTerm);

				let newTermObject = {};

				Object.keys(data).forEach((keyInResult) => {
					// extract url-containing data first
					if (urlCatsByTerm.includes(keyInResult)) {
						// extract urls from list
						let idsFromUrls = [ 'unknown' ];
						if (!data[keyInResult]) {
							console.log(
								'keyInResult',
								keyInResult,
								data[keyInResult]
							);
							console.log(
								'dataId, data, dataTerm',
								dataId,
								data,
								dataTerm
							);
						} else {
							idsFromUrls = extractIdsFromUrls(data[keyInResult]);
						}

						// set data to newTermObject &
						newTermObject[dataId] = {
							...newTermObject[dataId]
						};
						newTermObject[dataId][keyInResult] = idsFromUrls;
					} else {
						// and set non-url data as ids
						newTermObject[dataId] = {
							...newTermObject[dataId]
						};
						newTermObject[dataId][keyInResult] = data[keyInResult];
					}
				});

				// Data set here
				setTimeout(() => {
					setData((prev) => ({
						...prev,
						[dataTerm]: {
							...prev[dataTerm],
							...newTermObject
						}
					}));
				}, 2000);
			};

			// Call starts here ////////////////////////////////////////
			if (
				data.hasOwnProperty(term) &&
				data[term].hasOwnProperty(dataId)
			) {
				let idsToFetch = [];

				const currentDetail = data[term][dataId];
				Object.keys(currentDetail).forEach((detailKey) => {
					if (urlCatsByTerm.includes(detailKey)) {
						let ids = currentDetail[detailKey];
						console.log('ids', ids);
						ids.forEach((id) => {
							if (id !== 'n/a') {
								const [ idTerm ] = id.split('_');
								if (
									!(
										data.hasOwnProperty(idTerm) &&
										data[idTerm].hasOwnProperty(id)
									)
								) {
									idsToFetch.push({ id, idTerm });
								}
							} else {
								console.log('id', id);
								console.log('currentDetail', currentDetail);
							}
						});
					}
				});

				// fetch ids
				idsToFetch.forEach((inId) => {
					const { id, idTerm } = inId;
					// console.log('id', id);
					Object.keys(allData[idTerm]).forEach((page) => {
						if (page === Number.parseInt(page, 10).toString()) {
							allData[idTerm][page].forEach((item) => {
								const itemId = idFromUrl(item.url);
								if (itemId === id) {
									// We have now found the single item result as
									// it would come from API

									// send the data to a setter function
									setByDataId({
										dataId: id,
										data: item,
										dataTerm: idTerm
									});
								}
							});
						}
					});
				});
			}
			// console.log('just finished writing url data...');
		},
		[ dataId ]
	);

	const getTerms = (term) => {
		setTerm(term);
		setPage(1);
		setDataId('');
	};

	const getPage = (page) => {
		setPage(page);
	};

	const changeId = (changeToId) => {
		setDataId(changeToId);
	};

	const renderTerms = () => {
		return categories.map((cat) => {
			return <div onClick={() => getTerms(cat)}>{cat}</div>;
		});
	};

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
					if (
						data.hasOwnProperty(dataKey) &&
						data[dataKey].hasOwnProperty(item)
					) {
						let itemName = data[dataKey][item].name;
						returnItems.push({ name: itemName, id: item });
					} else {
						returnItems.push({ name: item, id: item });
					}
				});
				arrays.push({ [keyInObj]: [ ...returnItems ] });
			} else {
				singles.push({ [keyInObj]: inObj[keyInObj] });
			}
		});

		return [ ...singles, ...arrays ];
	};

	const renderMenu = () => {
		if (
			data.hasOwnProperty(term) &&
			data[term].hasOwnProperty(`page_${page}`) &&
			Object.keys(data[term]).length > 0
		) {
			let termsArray = [];
			let pageIdsArray = data[term][`page_${page}`];
			pageIdsArray.forEach((pageId) => {
				if (pageId.includes(term)) {
					termsArray.push({
						pageId: pageId,
						page: page,
						name: data[term][pageId].name
					});
				}
			});

			return (
				<div>
					{termsArray.map((el) => {
						return (
							<div onClick={() => changeId(el.pageId)}>
								{el.name}
							</div>
						);
					})}
					Pages:
					{renderPageLinks(data[term].count)}
				</div>
			);
		}
	};

	const renderPageLinks = (pageCount) => {
		let pages = Math.ceil((pageCount + 1) / 10);
		let pageLinksArray = [];
		for (let i = 1; i <= pages; i++) {
			pageLinksArray.push({ page: i, display: `${i}` });
		}

		return (
			<div>
				{pageLinksArray.map((link) => (
					<span onClick={() => getPage(link.page)}>
						{' '}
						{link.display}{' '}
					</span>
				))}
			</div>
		);
	};

	const renderDetail = () => {
		if (
			data.hasOwnProperty(term) &&
			data[term].hasOwnProperty(dataId) &&
			Object.keys(data[term][dataId]).length > 0
		) {
			let detailData = data[term][dataId];
			return (
				<div>
					<div>
						{renderPreparedDetail(detailData).map((el) => {
							// el is an object

							if (Array.isArray(Object.values(el)[0])) {
								return (
									<div className="v4_keyValBox">
										<div className="v4_left">
											{Object.keys(el)[0]}
										</div>
										<div className="v4_right">
											{Object.keys(el).map((val) => {
												return el[
													val
												].map((valInside) => {
													return (
														<div
															onClick={() =>
																console.log(
																	'needs a handler...'
																)}
														>
															{valInside.name ||
																'missing...'}
														</div>
													);
												});
											})}
										</div>
									</div>
								);
							} else {
								return (
									<div className="v4_keyValBox">
										<div className="v4_left">
											{Object.keys(el)[0]}
										</div>
										<div className="v4_right">
											{Object.values(el)[0]}
										</div>
									</div>
								);
							}
						})}
					</div>
				</div>
			);
		}
	};

	return (
		<div className="v4_page">
			<div className="v4_terms">
				<div>Categories</div>
				{renderTerms()}
			</div>
			<div className="v4_menu">
				<div>Menu</div>
				{renderMenu()}
			</div>
			<div className="v4_detail">
				<div>Detail</div>
				{renderDetail()}
			</div>
		</div>
	);
};

export default V4;
