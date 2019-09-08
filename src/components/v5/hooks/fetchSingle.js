import { memoizedFetch } from '../helpers/api';
import { singleReducer } from './reducers';
import { getUrlInfo } from './reducers';

const BASE_URL = 'https://swapi.co/api/';

function handleResults(data) {
	const [ category ] = getUrlInfo(data.data.url);

	if (category === 'films') {
		const dataWithName = { ...data.data };
		dataWithName.name = data.data.title;

		return dataWithName;
	}

	return data.data;
}

// fetch data from api
export const fetchData = async (setData, { category, itemNumber }) => {
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
		const checkedData = handleResults(data);

		setData((prev) =>
			singleReducer(prev, {
				category,
				itemNumber,
				data: checkedData
			})
		);
	} catch (error) {
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
