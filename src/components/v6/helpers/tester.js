const removeUnderscores = (str) => str.replace(/_/g, ' ');

const capitalize = (word) => {
	return `${word[0].toUpperCase()}${word.slice(1)}`;
};

const capitalizeTitleCase = (str) => {
	return str
		.split(' ')
		.map((word) => {
			return capitalize(word);
		})
		.join(' ');
};

const capitalizeSentenceCase = (str) => {
	let words = removeUnderscores(str).split(' ');
	return [ capitalize(words[0]), ...words.slice(1) ].join(' ');
};

const capitalizeCommaList = (str) => {
	let words = str.split(', ');
	return [ ...words.map((word) => capitalize(word)) ].join(', ');
};

const getLocaleNumber = (inStr) => {
	let str = inStr.toString();

	if (
		!Number.isNaN(Number.parseFloat(str, 10)) &&
		Number.parseFloat(str, 10).toString() === str
	) {
		return Number.parseFloat(str, 10).toLocaleString();
	}
	return str;
};

function getUTCDate(dateStr) {
	let date = new Date(Date.parse(dateStr)).toUTCString();
	let dateArray = date.split(' ').splice(1, 3);
	return dateArray.join(' ');
}

function getItemId(category, itemNumber) {
	return `${category}_${itemNumber}`;
}

const getIsUrl = (val) => {
	if (!(typeof val === 'string')) {
		return null;
	}
	return val.includes('https://swapi.co/api/') ? true : false;
};

function getUrlInfo(url) {
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

function getUrlIdsFromItem(item) {
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

function removeEmptyEntries(inObj) {
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
				(val.length === 0 ||
					(!val[0] && val !== 0) ||
					val[0].charCodeAt(0) < 33))
		) {
			return;
		}

		outObj[key] = val;
	});

	return outObj;
}

function orderByKeyGroups(initObj) {
	let singles = {};
	let lists = {
		people: [],
		characters: [],
		residents: [],
		species: [],
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

// function getUTCDate(dateStr) {
// 	let date = new Date(Date.parse(dateStr)).toUTCString();
// 	let dateArray = date.split(' ').splice(1, 3);
// 	return dateArray.join(' ');
// }

// console.log('getUTCDate("1995-10-23")', getUTCDate('1995-10-23'));

// const capitalize = (word) => {
// 	return `${word[0].toUpperCase()}${word.slice(1)}`;
// };

// const capitalizeCommaList = (str) => {
// 	let words = str.split(', ');
// 	return [ ...words.map((word) => capitalize(word)) ].join(', ');
// };

// console.log(
// 	'capitalizeCommaList("one, two, many, ...go")',
// 	capitalizeCommaList('one, two, many, ...go')
// );

// function removeEmptyEntries(inObj) {
// 	let outObj = {};

// 	Object.keys(inObj).forEach((key) => {
// 		let val = inObj[key];

// 		if (!key) {
// 			return;
// 		}

// 		if (
// 			!val ||
// 			!(typeof val === 'string' || Array.isArray(val)) ||
// 			(Array.isArray(val) && val.length < 1) ||
// 			!val[0] ||
// 			val[0].charCodeAt(0) < 33
// 		) {
// 			return;
// 		}

// 		outObj[key] = val;
// 	});

// 	return outObj;
// }

// const testObj = {
// 	one: 'Sun',
// 	two: '',
// 	three: [ 'url1', 'url2' ],
// 	four: [],
// 	five: [ ' ' ],
// 	six: [ '' ],
// 	seven: [ 'Last man standing...!' ],
// 	eight: 0,
// 	nine: {},
// 	ten: null,
// 	eleven: undefined,
// 	twelve: { '': '' }
// };

// console.log('removeEmptyEntries(testObj)', removeEmptyEntries(testObj));

const orderObj = {
	name: 'Naboo',
	rotation_period: 26,
	orbital_period: 312,
	diameter: 12120,
	climate: 'temperate',
	gravity: '1 standard',
	terrain: 'grassy hills, swamps, forests, mountains',
	surface_water: 12.48,
	surface_water2: '12.48',
	population: 4500000000,
	population2: '4500000000',
	residents: [
		'https://swapi.co/api/people/3/',
		'https://swapi.co/api/people/35/'
	],
	films: [ 'https://swapi.co/api/films/5/', 'https://swapi.co/api/films/3/' ],
	created: '2014-12-10T11:52:31.066000Z',
	edited: '2014-12-20T20:58:18.430000Z',
	url: 'Array[1]'
};

const orderObj2 = {
	title: 'Attack of the Clones',
	episode_id: 2,
	opening_crawl:
		'There is unrest in the Galactic\r\nSenate... to assist the overwhelmed\r\n...',
	director: 'George Lucas',
	producer: 'Rick McCallum',
	release_date: '2002-05-16',
	characters: [
		'https://swapi.co/api/people/2/',
		'https://swapi.co/api/people/82/',
		'https://swapi.co/api/people/35/'
	],
	planets: [
		'https://swapi.co/api/planets/8/',
		'https://swapi.co/api/planets/9/'
	],
	starships: [
		'https://swapi.co/api/starships/21/',
		'https://swapi.co/api/starships/39/'
	],
	vehicles: [
		'https://swapi.co/api/vehicles/4/',
		'https://swapi.co/api/vehicles/44/'
	],
	species: [
		'https://swapi.co/api/species/32/',
		'https://swapi.co/api/species/31/'
	],
	created: '2014-12-20T10:57:57.886000Z',
	edited: '2015-04-11T09:45:01.623982Z',
	url: 'https://swapi.co/api/films/5/',
	name: 'Attack of the Clones'
};
const orderObj3 = {
	title: 'Attack of the Clones',
	episode_id: 2,
	opening_crawl:
		'There is unrest in the Galactic\r\nSenate... to assist the overwhelmed\r\n...',
	director: 'George Lucas',
	producer: 'Rick McCallum',
	release_date: '2002-05-16',
	characters: [ 'https://swapi.co/api/people/2/' ],
	planets: [
		'https://swapi.co/api/planets/8/',
		'https://swapi.co/api/planets/9/'
	],
	starships: [ 'https://swapi.co/api/starships/21/' ],
	vehicles: [ 'https://swapi.co/api/vehicles/4/' ],
	species: [
		'https://swapi.co/api/species/32/',
		'https://swapi.co/api/species/31/'
	],
	created: '2014-12-20T10:57:57.886000Z',
	edited: '2015-04-11T09:45:01.623982Z',
	url: 'https://swapi.co/api/films/5/',
	name: 'Attack of the Clones'
};

// function orderByKeyGroups(initObj) {
// 	let singles = {};
// 	let lists = {};
// 	let crawl = {};

// 	const inObj = { ...removeEmptyEntries(initObj) };

// 	Object.keys(inObj).forEach((key) => {
// 		let val = inObj[key];

// 		if ([ 'created', 'edited', 'url', 'title' ].includes(key)) {
// 			return;
// 		} else if (key === 'opening_crawl') {
// 			crawl[key] = val;
// 		} else if (Array.isArray(val)) {
// 			if (val.length > 1) {
// 				lists[key] = val;
// 			} else if (val.length === 1) {
// 				singles[key] = val[0];
// 			}
// 		} else {
// 			singles[key] = val;
// 		}
// 	});

// 	singles = { name: singles['name'], ...singles };
// 	const outObj = { ...singles, ...crawl, ...lists };

// 	return outObj;
// }

// console.log('orderByKeyGroups(orderObj)', orderByKeyGroups(orderObj));
// console.log('orderByKeyGroups(orderObj2)', orderByKeyGroups(orderObj2));

// Number to localestring
// Date to localedate
// Capitalize key
// Capitalize first word
// Capitalize each word in comma-separated list
// Remove empty keyVal pairs

// Order to singles, opening-crawl, arrays (films last)

const prepareItemData = (initObj) => {
	let outObj = {};

	let inObj = orderByKeyGroups(initObj);
	// console.log('inObj', inObj);

	Object.keys(inObj).forEach((key) => {
		let val = inObj[key];

		if (key === 'episode_id') {
			key = 'episode';
		}
		key = capitalizeTitleCase(removeUnderscores(key));

		// console.log('typeof val', typeof val);
		if (
			typeof val === 'number' ||
			val === Number.parseFloat(val).toString()
		) {
			outObj[key] = getLocaleNumber(val);
		} else if (key.includes('date') || key.includes('Date')) {
			outObj[key] = getUTCDate(val);
		} else if (typeof val === 'string') {
			if (key !== 'Opening Crawl' && val.includes(',')) {
				outObj[key] = capitalizeSentenceCase(val);
			} else {
				outObj[key] = capitalizeSentenceCase(val);
			}
		} else if (Array.isArray(val)) {
			outObj[key] = val;
		}
	});

	return outObj;
};

// console.log('removeEmptyEntries(orderObj2)', removeEmptyEntries(orderObj2));
console.log('..................................................');
// console.log('....prepareItemData(orderObj)', prepareItemData(orderObj));
// console.log('.........prepareItemData(orderObj3)', prepareItemData(orderObj3));

const prepObj = {
	characters: [
		'https://swapi.co/api/people/2/',
		'https://swapi.co/api/people/3/',
		'https://swapi.co/api/people/10/',
		'https://swapi.co/api/people/11/',
		'https://swapi.co/api/people/16/',
		'https://swapi.co/api/people/20/',
		'https://swapi.co/api/people/21/',
		'https://swapi.co/api/people/32/',
		'https://swapi.co/api/people/33/',
		'https://swapi.co/api/people/34/',
		'https://swapi.co/api/people/36/',
		'https://swapi.co/api/people/37/',
		'https://swapi.co/api/people/38/',
		'https://swapi.co/api/people/39/',
		'https://swapi.co/api/people/40/',
		'https://swapi.co/api/people/41/',
		'https://swapi.co/api/people/42/',
		'https://swapi.co/api/people/43/',
		'https://swapi.co/api/people/44/',
		'https://swapi.co/api/people/46/',
		'https://swapi.co/api/people/48/',
		'https://swapi.co/api/people/49/',
		'https://swapi.co/api/people/50/',
		'https://swapi.co/api/people/51/',
		'https://swapi.co/api/people/52/',
		'https://swapi.co/api/people/53/',
		'https://swapi.co/api/people/54/',
		'https://swapi.co/api/people/55/',
		'https://swapi.co/api/people/56/',
		'https://swapi.co/api/people/57/',
		'https://swapi.co/api/people/58/',
		'https://swapi.co/api/people/59/',
		'https://swapi.co/api/people/47/',
		'https://swapi.co/api/people/35/'
	],
	planets: [
		'https://swapi.co/api/planets/8/',
		'https://swapi.co/api/planets/9/',
		'https://swapi.co/api/planets/1/'
	],
	starships: [
		'https://swapi.co/api/starships/40/',
		'https://swapi.co/api/starships/41/',
		'https://swapi.co/api/starships/31/',
		'https://swapi.co/api/starships/32/',
		'https://swapi.co/api/starships/39/'
	],
	vehicles: [
		'https://swapi.co/api/vehicles/33/',
		'https://swapi.co/api/vehicles/34/',
		'https://swapi.co/api/vehicles/35/',
		'https://swapi.co/api/vehicles/36/',
		'https://swapi.co/api/vehicles/37/',
		'https://swapi.co/api/vehicles/38/',
		'https://swapi.co/api/vehicles/42/'
	],
	species: [
		'https://swapi.co/api/species/1/',
		'https://swapi.co/api/species/2/',
		'https://swapi.co/api/species/6/',
		'https://swapi.co/api/species/11/',
		'https://swapi.co/api/species/12/',
		'https://swapi.co/api/species/25/',
		'https://swapi.co/api/species/26/',
		'https://swapi.co/api/species/27/'
	]
};

const names = [
	'Senator Grievous',
	'Darth Vader',
	'R2-D2',
	'Sentinel-class landing craft',
	'Dantooine'
];

const arrsToObjs = (inObj) => {
	let outObj = {};

	Object.keys(inObj).forEach((key) => {
		let arrayOfUrls = inObj[key];
		outObj[key] = arrayOfUrls.map((url) => {
			return {
				url: url,
				itemName: names[Math.floor(Math.random() * 5)],
				itemId: idFromUrl(url),
				isFetching: Math.random() > 0.5 ? true : false,
				error: Math.random() > 0.8 ? 'Special test error' : ''
			};
		});
	});

	return outObj;
};

console.log('arrsToObjs(prepObj)', arrsToObjs(prepObj));
