import { useEffect, useState } from 'react';
import { getItemId, getUrlInfo, getUrlIdsFromItem } from '../helpers/helpers';
import { fetchSingle, fetchPage } from '../helpers/fetchData';
import { initialSingle } from '../helpers/reducers';

const initialDataState = {
	films: {
		count: 0,
		pages: {},
		items: {}
	},
	people: {
		count: 0,
		pages: {},
		items: {}
	},
	planets: {
		count: 0,
		pages: {},
		items: {}
	},
	species: {
		count: 0,
		pages: {},
		items: {}
	},
	starships: {
		count: 0,
		pages: {},
		items: {}
	},
	vehicles: {
		count: 0,
		pages: {},
		items: {}
	}
};

const useSwApi = () => {
	const [ data, setData ] = useState(initialDataState);
	const [ error, setError ] = useState('');
	const [ isFetching, setIsFetching ] = useState(false);
	const [ requestForSingles, setRequestForSingles ] = useState([]);
	const [ requestForPage, setRequestForPage ] = useState({
		category: '',
		page: 0
	});
	const [ requestForItem, setRequestForItem ] = useState(''); // itemId eg: 'films_1'
	const [ currentDisplayData, setCurrentDisplayData ] = useState({
		currentPageData: {
			pageItems: [], // array of {itemId: 'films_1', itemName: 'The Phantom Menace'}
			pageLinks: [] // arrya of {pageNumber: 2, pageDisplay: 2}
		},
		currentItemData: {}
	});

	// Sync with requestForSingles
	useEffect(
		() => {
			// Iterate through array to initalize requests
			requestForSingles.forEach((req) => {
				const itemId = req;
				const [ category, itemNumber ] = itemId.split('_');

				// Check that data does not have itemId object already
				if (category && !data[category].items.hasOwnProperty(itemId)) {
					// Doesn't have item object yet so initialize one
					setData((prev) =>
						initialSingle(prev, { category, itemNumber })
					);

					// Then call the singles api function
					fetchSingle(setData, { category, itemNumber });
				}
			});
		},
		[ requestForSingles, data ]
	);

	// Sync with requestForPage - Fetch
	useEffect(
		() => {
			// handle fetching of page data
			const { category, page: pageNumber } = requestForPage;

			if (category !== '' && pageNumber > 0) {
				if (
					data.hasOwnProperty(category) &&
					!data[category].pages.hasOwnProperty(pageNumber)
				) {
					console.log('category, pageNumber', category, pageNumber);
					fetchPage(
						{ setData, setError, setIsFetching },
						{ category, pageNumber }
					);
				}
			}

			// console.log('Sync requestForPage');
		},
		[ requestForPage, data ]
	);

	// Sync with requestForItem - To get the Urls to fetch
	useEffect(
		() => {
			// when requestForItem changes, get item from data and setCurrentDisplayData
			// AND get any urls and setRequestForSingles with them
			const itemId = requestForItem;

			const [ category ] = itemId.split('_');
			if (
				data.hasOwnProperty(category) &&
				data[category].items.hasOwnProperty(itemId)
			) {
				const itemData = data[category].items[itemId];

				let urlsArray = getUrlIdsFromItem(itemData);

				// On getting data, gather all urls and set request for singles
				setRequestForSingles(urlsArray);
			}
		},
		[ requestForItem, data ]
	);

	// Sync currentDisplayData with data
	useEffect(
		() => {
			// when data changes, change currentDispalyData accordingly
			let currentPageData = {};
			const { category, page } = requestForPage;

			// page reducer logic
			if (isFetching) {
				currentPageData = { isFetching };
			} else if (error !== '') {
				currentPageData = { error };
			} else {
				if (data.hasOwnProperty(category)) {
					let dataCatKeys = Object.keys(data[category]);
					if (dataCatKeys.includes('pages')) {
						if (Object.keys(data[category].pages).length > 0) {
							let itemIdsInPage = data[category].pages[page];

							let pageDisplayArray = itemIdsInPage.map((id) => {
								if (data[category].items.hasOwnProperty(id)) {
									return {
										itemId: id,
										itemName: data[category].items[id].name
									};
								}
								return '';
							});

							currentPageData = { pageItems: pageDisplayArray };
						}
					}
				}
			}

			setCurrentDisplayData((prev) => ({
				...prev,
				currentPageData
			}));
		},
		[ data, error, isFetching, requestForPage ]
	);

	// Sync currentDisplayData with data
	useEffect(
		() => {
			// Set display data for Item

			// *****
			//
			// Purpose is send consistent data for render
			//
			// *****

			const itemId = requestForItem;
			const [ category ] = itemId.split('_');

			if (data[category] && data[category].items.hasOwnProperty(itemId)) {
				let itemData = data[category].items[itemId];
				let itemDataToSet = {};

				// Iterate through item properties
				Object.keys(itemData).forEach((keyInItem) => {
					let value = itemData[keyInItem];

					// if a value is a single url - turn it into an array
					if (
						typeof value === 'string' &&
						value.includes('https://swapi.co/api/')
					) {
						value = [ value ];
					}

					// if a property is an array
					if (Array.isArray(value)) {
						let outArray = [];

						value.forEach((url) => {
							// Get item info
							let [ urlCat, urlNum ] = getUrlInfo(url);
							let urlItemId = getItemId(urlCat, urlNum);
							let itemFromData = {};

							// Check if item exists in "data"
							if (data[urlCat].items.hasOwnProperty(urlItemId)) {
								let urlItemData = data[urlCat].items[urlItemId];

								// ?is it a single or a page item?

								// case: item from singles
								if (urlItemData.hasOwnProperty('data')) {
									// console.log('urlItemData', urlItemData);
									itemFromData = {
										isFetching: urlItemData.isFetching,
										error: urlItemData.error,
										itemName: urlItemData.data.name,
										url: url
									};
								} else {
									// case: item from page

									itemFromData = {
										itemName: urlItemData.name,
										url: url
									};
								}
							} else {
								itemFromData = {
									itemName: '...',
									url: url
								};
							}

							outArray.push(itemFromData);
						});

						itemDataToSet[keyInItem] = outArray;
					} else {
						itemDataToSet[keyInItem] = value;
					}
				});

				setCurrentDisplayData((prev) => ({
					...prev,
					currentItemData: itemDataToSet
				}));
			}
		},
		[ data, requestForItem ]
	);

	return [ currentDisplayData, setRequestForPage, setRequestForItem ];
};

export default useSwApi;
