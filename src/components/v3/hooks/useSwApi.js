import { useEffect, useState } from 'react';
import { memoizedFetch } from '../helpers/api';

const BASE_URL = 'https://swapi.co/api/';

const categories = [
	'films',
	'people',
	'planets',
	'species',
	'starships',
	'vehicles'
];

// const fetchElement = ({ elementObj, apiHook }) => {
// 	// Only job is to fetch ONE page of ONE term
// 	const [ element, setElement ] = useState(null);
// 	const [ isFetchingEl, setIsFetchingEl ] = useState(false);
// 	const [ errorEl, setErrorEl ] = useState('');
// 	const { term, page } = elementObj;
// 	const { data, dataSetter } = apiHook;

// 	// First check if data already contains page

// 	// if it does return it

// 	// if not fetch it

// 	// set fetching to true
// 	// set error to ""
// };

const useSwApi = () => {
	const [ data, setData ] = useState({});
	const [ isFetching, setIsFetching ] = useState(false);
	const [ error, setError ] = useState('');
	const [ term, setTerm ] = useState('');
	const [ page, setPage ] = useState(0);
	const [ detail, setDetail ] = useState({});

	function handleResults(data) {
		let results = data.data.results;

		if (results[0].hasOwnProperty('name') && term !== 'films') {
			return data;
		} else {
			let dataWithNames = JSON.parse(JSON.stringify(data));
			dataWithNames.data.results = [];

			let item;
			for (item of results) {
				item['name'] = item.title;
				dataWithNames.data.results.push(item);
			}

			dataWithNames.data.results.sort(
				(a, b) => a.episode_id - b.episode_id
			);

			return dataWithNames;
		}
	}

	function dataReducer(prev, dataToReduce) {
		let termObject = {};

		if (prev.hasOwnProperty(term)) {
			termObject = { ...prev[term] };
		} else {
			termObject = { count: dataToReduce.data.count };
		}

		return {
			...prev,
			[term]: {
				...termObject,
				[page]: dataToReduce.data.results
			}
		};
	}

	useEffect(
		() => {
			const fetchData = async () => {
				setError('');
				setIsFetching(true);

				const url = `${BASE_URL}${term}/?page=${page}`;

				const config = {
					method: 'get',
					headers: {
						Accept: 'application/json, text/plain, */*'
					}
				};

				try {
					const data = await memoizedFetch(url, config);
					const dataToSet = handleResults(data);
					// console.log('dataToSet', dataToSet)
					// const preparedData = prepareData(dataToSet)

					setData((prev) => dataReducer(prev, dataToSet));
				} catch (error) {
					setError(JSON.stringify(error));
				}

				setIsFetching(false);
			};

			// Check that the data is not present already
			if (data.hasOwnProperty(term) && data[term].hasOwnProperty(page)) {
				return;
			} else {
				// If not, fetch it
				if (term && page) fetchData();
			}
		},
		[ term, page ]
	);

	return [
		{ categories, data, isFetching, error, term, page, detail },
		{ setIsFetching, setError, setTerm, setPage, setDetail }
	];
};

export default useSwApi;

// {
// 	films<term>: {
// 		count: 7,
// 		next: ?,
// 		previous: ?,
// 		1<page>: [
// 			{},
// 			{},
// 			...
// 		]
// 	},
// 	people<term>: {
// 		count: 87,
// 		next: ?,
// 		previous: ?,
// 		1<page>: [
// 			{},
// 			{},
// 			...
// 		]
// 	}
// }
