import CONSTANTS from '../../../constants.json';

export const urlCatsByTerm = CONSTANTS.urlCatsByTerm;

export const removeUnderscores = (str) => str.replace(/_/g, ' ');

export const capitalize = (word) => {
	return `${word[0].toUpperCase()}${word.slice(1)}`;
};

export const capitalizeTitleCase = (str) => {
	return str
		.split(' ')
		.map((word) => {
			return capitalize(word);
		})
		.join(' ');
};

export const capitalizeSentenceCase = (str) => {
	let words = removeUnderscores(str).split(' ');
	return [ capitalize(words[0]), ...words.slice(1) ].join(' ');
};

export const capitalizeCommaList = (str) => {
	let words = str.split(', ');
	return [ ...words.map((word) => capitalize(word)) ].join(', ');
};

export const getLocaleNumber = (inStr) => {
	let str = inStr.toString();

	if (
		!Number.isNaN(Number.parseFloat(str, 10)) &&
		Number.parseFloat(str, 10).toString() === str
	) {
		return Number.parseFloat(str, 10).toLocaleString();
	}
	return str;
};

export function getUTCDate(dateStr) {
	let date = new Date(Date.parse(dateStr)).toUTCString();
	let dateArray = date.split(' ').splice(1, 3);
	return dateArray.join(' ');
}

export function getItemId(category, itemNumber) {
	return `${category}_${itemNumber}`;
}

export const getIsUrl = (val) => {
	if (!(typeof val === 'string')) {
		return null;
	}
	return val.includes('https://swapi.co/api/') ? true : false;
};

export function getUrlInfo(url) {
	const [ category, idNumber ] = url
		.replace('https://swapi.co/api/', '')
		.split('/');
	return [ category, idNumber ];
}

export const idFromUrl = (url) => {
	// ** args: url<string>
	// ** return: id<string>

	if (typeof url === 'string') {
		const [ category, idNumber ] = getUrlInfo(url);

		return getItemId(category, idNumber);
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

export function removeEmptyEntries(inObj) {
	let outObj = {};

	Object.keys(inObj).forEach((key) => {
		let val = inObj[key];

		if (!key) {
			return;
		}

		if (
			!val ||
			!(
				typeof val === 'string' ||
				typeof val === 'number' ||
				Array.isArray(val)
			) ||
			(Array.isArray(val) &&
				(val.length < 1 ||
					(!val[0] && val !== 0) ||
					(val[0].length > 0 && val[0].charCodeAt(0) < 33)))
		) {
			return;
		}

		outObj[key] = val;
	});

	return outObj;
}

export function orderByKeyGroups(initObj) {
	let singles = {};
	let lists = {
		people: [],
		characters: [],
		residents: [],
		species: [],
		homeworld: [],
		planets: [],
		starships: [],
		vehicles: [],
		films: []
	};
	let crawl = {};

	const inObj = { ...removeEmptyEntries(initObj) };

	Object.keys(inObj).forEach((key) => {
		let val = inObj[key];

		if ([ 'created', 'edited', 'url', 'title' ].includes(key)) {
			return;
		} else if (key === 'opening_crawl') {
			crawl[key] = val;
		} else if (Array.isArray(val)) {
			if (val.length > 0) {
				lists[key] = val;
			}
		} else {
			singles[key] = val;
		}
	});

	singles = { name: singles['name'], ...singles };
	const outObj = { ...singles, ...crawl, ...lists };

	return { ...removeEmptyEntries(outObj) };
}
