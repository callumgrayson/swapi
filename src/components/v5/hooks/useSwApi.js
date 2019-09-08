import { useEffect, useState } from 'react';
import { fetchData } from './fetchSingle';
import { getItemId, initialSingle } from './reducers';

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
	const [ requestForSingles, setRequestForSingles ] = useState([]);

	useEffect(
		() => {
			// Sync with requestForSingles stuff

			// Iterate through array to initalize requests
			requestForSingles.forEach((req) => {
				const { category, itemNumber } = req;
				const itemId = getItemId(category, itemNumber);

				// Check that data does not have itemId object already
				if (!data[category].items.hasOwnProperty(itemId)) {
					// Doesn't have item object yet so initialize one
					setData((prev) => initialSingle(prev, req));

					// Then call the singles api function
					fetchData(setData, { category, itemNumber });
				}
			});
		},
		[ requestForSingles, data ]
	);

	return [ data, setRequestForSingles ];
};

export default useSwApi;
