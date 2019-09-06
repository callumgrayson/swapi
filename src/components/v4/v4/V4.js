import React, { useEffect, useState } from 'react';
import allData from '../allData.json';

const urlCatsByTerm = [
	'people',
	'films',
	'planets',
	'people',
	'planets',
	'people',
	'species',
	'starships',
	'starships'
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

const V4 = () => {
	const [ term, setTerm ] = useState('');
	const [ page, setPage ] = useState(0);
	const [ requestPage, setRequestPage ] = useState({ term: '', page: 0 });
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
			// fetch data from allData.json
			let count;
			let results;
			let newTermObject;
			let dataToFetch;
			const { term, page } = requestPage;
			if (term === '' && page === 0) {
				return;
			}
			count = allData[term].count;
			results = allData[term][page];

			// results are in... Now set non-url data
			// and set url data as ids
			// extract url-containing data first
			results.map((result) => {
				Object.keys(result).map((keyInResult) => {
					if (urlCatsByTerm.includes(keyInResult)) {
						// extract urls from list
						let idsFromUrls = extractIdsFromUrls(
							result[keyInResult]
						);
						// set data to newTermObject &

						// set data to dataToFetch
					}

					return;
				});

				return;
			});
			// ids come from parsing the url
			console.log('results', results);
			// extract non-url data

			setData((prev) => ({
				...prev,
				[term]: {
					...prev[term],
					...newTermObject
				}
			}));
		},
		[ requestPage ]
	);

	const parseUrl = (url) => {
		// "https://swapi.co/api/people/2/"
		let termAndId = url.replace('https://swapi.co/api/', '').split('/');
		const [ term, id ] = termAndId;
		return {
			term: term,
			id: id
		};
	};

	const getFilms = () => {
		setRequestPage(() => ({ term: 'films', page: 1 }));
		setTerm('films');
		setPage(1);
	};

	const renderFilms = () => {
		if (
			term === 'films' &&
			page === 1 &&
			data.hasOwnProperty('films') &&
			Object.keys(data.films).length > 0
		) {
			const filmsArray = Object.keys(data.films).map((filmKey) => {
				return { [filmKey]: data.films[filmKey] };
			});
			return (
				<div>
					{filmsArray.map((el) => {
						return (
							<div>
								{Object.keys(el).map((item) => {
									return `${el[item].title}`;
								})}
							</div>
						);
					})}
				</div>
			);
		}
	};

	return (
		<div>
			<div>API logic rewrite...</div>
			<div>Move down</div>
			<button onClick={getFilms}>Get Films</button>
			<div>
				<div>Films</div>
				{renderFilms()}
			</div>
		</div>
	);
};

export default V4;

const responseDataSchema = {
	count: 7,
	next: null,
	previous: null,
	results: [
		{
			title: 'The Phantom Menace',
			episode_id: 1,
			opening_crawl: 'Turmoil has engulfed the\r\nGalactic Republic...',
			director: 'George Lucas',
			producer: 'Rick McCallum',
			release_date: '1999-05-19',
			characters: [ 'https://swapi.co/api/people/2/' ],
			planets: [ 'https://swapi.co/api/planets/8/' ],
			starships: [ 'https://swapi.co/api/starships/40/' ],
			vehicles: [ 'https://swapi.co/api/vehicles/33/' ],
			species: [ 'https://swapi.co/api/species/1/' ],
			created: '2014-12-19T16:52:55.740000Z',
			edited: '2015-04-11T09:45:18.689301Z',
			url: 'https://swapi.co/api/films/4/',
			name: 'The Phantom Menace'
		}
	]
};
