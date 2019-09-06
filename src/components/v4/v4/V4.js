import React, { useEffect, useState } from 'react';
import allData from '../allData.json';

const urlCatsByTerm = [
	'characters',
	'films',
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

	const [ term, id ] = url.replace('https://swapi.co/api/', '').split('/');

	return `${term}_${id}`;
};

const extractIdsFromUrls = (urlsArray) => {
	// ** args: urls<array>
	// ** return: ids<array>

	return urlsArray.map((url) => idFromUrl(url));
};

const categorizeById = (ids) => {
	// ** args: ids<array<string>>
	// ** return: splitIds<object>

	let splitIds = {};

	ids.forEach((id) => {
		const [ term ] = id.split('_');
		splitIds = {
			...splitIds,
			[term]: {
				...splitIds[term],
				[id]: id
			}
		};
	});

	Object.keys(splitIds).forEach((id) => {
		const count = Object.keys(splitIds[id]).length;

		splitIds[id]['count'] = count;
	});

	return splitIds;
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
			let dataToFetch = [];

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
				console.log('fetch triggered: ', term, page, dataId);
				console.log('results', results);

				// results are in... Now set url data as ids
				results.forEach((result) => {
					const termId = idFromUrl(result.url);

					Object.keys(result).forEach((keyInResult) => {
						// extract url-containing data first
						if (urlCatsByTerm.includes(keyInResult)) {
							// extract urls from list
							let idsFromUrls = extractIdsFromUrls(
								result[keyInResult]
							);

							// set data to newTermObject &
							newTermObject[termId] = {
								...newTermObject[termId]
							};
							newTermObject[termId][keyInResult] = idsFromUrls;

							// set data to dataToFetch
							dataToFetch = [ ...dataToFetch, ...idsFromUrls ];
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

				const dataToFetchFromFilms = categorizeById(dataToFetch);

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
				console.log('dataId, data, dataTerm', dataId, data, dataTerm);
			};

			if (
				data.hasOwnProperty(term) &&
				data[term].hasOwnProperty(dataId)
			) {
				let idsToFetch = [];

				const currentDetail = data[term][dataId];
				Object.keys(currentDetail).forEach((detailKey) => {
					if (urlCatsByTerm.includes(detailKey)) {
						let ids = currentDetail[detailKey];
						ids.forEach((id) => {
							const [ idTerm ] = id.split('_');
							// console.log('idTerm', idTerm);
							if (
								!(
									data.hasOwnProperty(idTerm) &&
									data[idTerm].hasOwnProperty(id)
								)
							) {
								idsToFetch.push({ id, idTerm });
							}
						});
					}
				});

				// console.log('idsToFetch', idsToFetch);
				// fetch ids
				idsToFetch.forEach((inId) => {
					const { id, idTerm } = inId;
					// console.log('id', id);
					let dataFromFetch = Object.keys(
						allData[idTerm]
					).forEach((page) => {
						if (page === Number.parseInt(page, 10).toString()) {
							// console.log('page', page);
							allData[idTerm][page].forEach((item) => {
								const itemId = idFromUrl(item.url);
								if (itemId === id) {
									// console.log(
									// 	'item, id, itemId',
									// 	item,
									// 	id,
									// 	idTerm
									// );
									// setData
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
			return (
				<div>
					<div>Detail goes here</div>
					{dataId !== 0 && <div>{dataId}</div>}
					<div>
						<div>{data[term][dataId].name}</div>
						<div>{data[term][dataId].url}</div>
						{/* <div>
							{data[term][dataId].characters.map((char) => (
								<div>{char}</div>
							))}
						</div> */}
					</div>
				</div>
			);
		}
	};

	return (
		<div>
			<div>API logic rewrite...</div>
			<div>
				<div>Categories</div>
				{renderTerms()}
			</div>
			<br />
			<div>
				<div>Menu</div>
				{renderMenu()}
			</div>
			<br />
			<div>
				<div>Detail</div>
				{renderDetail()}
			</div>
		</div>
	);
};

export default V4;
