import { memoizedFetch } from './api';

const BASE_URL = 'https://swapi.co/api/';

export const categories = [
	'films',
	'people',
	'planets',
	'species',
	'starships',
	'vehicles'
];

const apiController = async (params) => {
	const { searchTerm, searchPage } = params;
	const url = `${BASE_URL}${searchTerm}/?page=${searchPage}`;

	return new Promise(async (resolve, reject) => {
		const data = await memoizedFetch(url);
		let results = data.data.results;
		// console.log('data.data', data.data);
		if (results[0].hasOwnProperty('name') && searchTerm !== 'films') {
			resolve(data);
		} else {
			// console.log('results', results);
			let dataWithNames = JSON.parse(JSON.stringify(data));
			dataWithNames.data.results = [];
			let item;
			for (item of results) {
				item['name'] = item.title;
				dataWithNames.data.results.push(item);
			}
			// console.log(
			// 	'dataWithNames.data.results',
			// 	dataWithNames.data.results
			// );
			dataWithNames.data.results.sort(
				(a, b) => a.episode_id - b.episode_id
			);
			// console.log(
			// 	'dataWithNames.data.results',
			// 	dataWithNames.data.results
			// );
			resolve(dataWithNames);
		}
	});
};

export default apiController;
