import {
	getLocaleNumber,
	getUTCDate,
	capitalizeTitleCase,
	capitalizeSentenceCase,
	capitalizeCommaList,
	orderByKeyGroups,
	removeUnderscores
} from './helpers';

// Number to localestring
// Date to localedate
// Capitalize one word
// Capitalize first word
// Capitalize each word in comma-separated list
// Remove empty keyVal pairs
// Order to singles, opening-crawl, arrays (films last)

export const prepareItemData = (initObj) => {
	let outObj = {};

	let inObj = orderByKeyGroups(initObj);

	Object.keys(inObj).forEach((key) => {
		let val = inObj[key];

		if (key === 'episode_id') {
			key = 'episode';
		}
		key = capitalizeTitleCase(removeUnderscores(key));

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
			} else if (val === 'n/a') {
				outObj[key] = val;
			} else {
				outObj[key] = capitalizeSentenceCase(val);
			}
		} else if (Array.isArray(val)) {
			outObj[key] = val;
		}
	});

	return outObj;
};
