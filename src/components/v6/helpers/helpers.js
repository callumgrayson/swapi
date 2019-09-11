export const urlCatsByTerm = [
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

export const capitalize = (str) => {
	return str
		.split(' ')
		.map((word) => {
			return `${word[0].toUpperCase()}${word.slice(1)}`;
		})
		.join(' ');
};

export const removeUnderscores = (str) => str.replace('_', ' ');

export function getItemId(category, itemNumber) {
	return `${category}_${itemNumber}`;
}

export function getUrlInfo(url) {
	const [ category, idNumber ] = url
		.replace('https://swapi.co/api/', '')
		.split('/');
	return [ category, idNumber ];
}

const idFromUrl = (url) => {
	// ** args: url<string>
	// ** return: id<string>

	if (typeof url === 'string') {
		const [ category, idNumber ] = getUrlInfo(url);

		return `${category}_${idNumber}`;
	} else {
		console.log('url', url);
		return;
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

export function getUrlIdsFromItem(item) {
	// ** args: item<object>, itemId
	// ** return: ids<array><array>

	let idsArray = [];

	Object.keys(item).forEach((keyInItem) => {
		// extract url-containing data
		if (urlCatsByTerm.includes(keyInItem)) {
			// extract urls from list
			let idsFromUrls = [];
			if (item[keyInItem]) {
				idsFromUrls = extractIdsFromUrls(item[keyInItem]);
			}
			idsArray.push(...idsFromUrls);
		}
	});

	return idsArray;
}
