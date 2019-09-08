import { memoizedFetch } from '../helpers/api';
import { singleReducer } from './reducers';

const BASE_URL = 'https://swapi.co/api/';

// fetch data from api
export const fetchData = async (setData, { category, itemNumber }) => {
	console.log('...fetching in fetchData');
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
		console.log('url', url);
		const data = await memoizedFetch(url, config);
		console.log('data', data);

		// ... results handler would go here if needed

		setData((prev) =>
			singleReducer(prev, {
				category,
				itemNumber,
				data: data.data
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
