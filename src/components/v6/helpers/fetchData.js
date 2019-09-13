import { memoizedFetch } from '../helpers/api';
import { getUrlInfo } from '../helpers/helpers';
import { singleReducer, pageReducer } from './reducers';

const BASE_URL = 'https://swapi.co/api/';

// *************************************************************
function handleSingleResults(data) {
	// data.data is the object of key value pairs in a single item
	const [ category ] = getUrlInfo(data.data.url);

	if (category === 'films') {
		const dataWithName = { ...data.data };
		dataWithName.name = data.data.title;

		return dataWithName;
	}

	return data.data;
}

// *************************************************************
function handlePageResults(data) {
	// data.data is the object the has count: next: previous: results: {keySingles: valueSingles}

	if (data.data.results[0].hasOwnProperty('name')) {
		return data;
	} else {
		let dataWithNames = { ...data };
		let results = data.data.results;

		let item;
		for (item of results) {
			item.name = item.title;
		}

		dataWithNames.data.results.sort((a, b) => a.episode_id - b.episode_id);
		return dataWithNames;
	}
}

// *************************************************************
// fetch data from api
export const fetchSingle = async (setData, { category, itemNumber }) => {
	// Set isFetching to true
	setData((prev) =>
		singleReducer(prev, {
			category,
			itemNumber,
			isFetching: true,
			error: ''
		})
	);

	const url = `${BASE_URL}${category}/${itemNumber}/`;

	const config = {
		method: 'get',
		headers: {
			Accept: 'application/json, text/plain, */*'
		}
	};

	try {
		const data = await memoizedFetch(url, config);

		// ... results handler would go here if needed
		const checkedData = handleSingleResults(data);

		// Set Data
		setData((prev) =>
			singleReducer(prev, {
				category,
				itemNumber,
				data: checkedData
			})
		);
	} catch (error) {
		// Set error
		setData((prev) =>
			singleReducer(prev, {
				category,
				itemNumber,
				error: JSON.stringify(error)
			})
		);
	}

	// Set isFetching back to false
	setData((prev) =>
		singleReducer(prev, {
			category,
			itemNumber,
			isFetching: false
		})
	);
};

// *************************************************************

export const fetchPage = async (
	{ setData, setError, setIsFetching },
	{ category, pageNumber }
) => {
	setError('');
	setIsFetching(true);

	const url = `${BASE_URL}${category}/?page=${pageNumber}`;

	const config = {
		method: 'get',
		headers: {
			Accept: 'application/json, text/plain, */*'
		}
	};

	try {
		const data = await memoizedFetch(url, config);
		// data is handledResponse - could be data or error inside

		const dataToSet = handlePageResults(data);

		setData((prev) =>
			pageReducer(prev, { category, data: dataToSet, page: pageNumber })
		);
	} catch (error) {
		console.log('error', error);
		setError(JSON.stringify(error));
	}

	setIsFetching(false);
};
