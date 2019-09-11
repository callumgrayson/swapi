import { getUrlInfo, getItemId } from '../helpers/helpers';

export function singleReducer(
	prev,
	{ category, itemNumber, isFetching, error, data }
) {
	const itemId = getItemId(category, itemNumber);

	const newItem = {
		...prev[category].items[itemId]
	};

	if (isFetching === true || isFetching === false) {
		newItem.isFetching = isFetching;
	}
	if (error) {
		console.log('error (in singleReducer)', error);
		newItem.error = error;
	}
	if (data) {
		newItem.data = data;
	}

	return {
		...prev,
		[category]: {
			...prev[category],
			items: {
				...prev[category].items,
				[itemId]: newItem
			}
		}
	};
}

export function initialSingle(prev, data) {
	const { category, itemNumber } = data;
	const itemId = getItemId(category, itemNumber);
	const initialObj = {
		data: '',
		error: '',
		isFetching: false
	};

	// Check for itemId was made before function call
	// Return a new data object with itemId initialized
	return {
		...prev,
		[category]: {
			...prev[category],
			items: {
				...prev[category].items,
				[itemId]: initialObj
			}
		}
	};
}

export function pageReducer(prev, { category, data, page }) {
	// Need to add count if data[category] does not exist
	// Need to iterate through each item in array
	// Add key: itemId, and value: itemValues
	// Add key: page to pages object and push itemIds to page array
	let newItems = {};
	let newCount = prev[category].count;
	let newPageArray = [];

	// Reduce count
	if (prev[category].count === 0) {
		newCount = data.data.count;
	}

	// Reduce Pages
	// Reduce items
	data.data.results.forEach((item) => {
		const url = item.url;
		const [ catFromUrl, idNumberFromUrl ] = getUrlInfo(url);
		const itemId = getItemId(catFromUrl, idNumberFromUrl);

		// add to newPages array
		newPageArray.push(itemId);

		// add to newItems object
		newItems[itemId] = { ...item };
	});

	let newData = {
		...prev,
		[category]: {
			...prev[category],
			count: newCount,
			pages: {
				...prev[category].pages,
				[page]: newPageArray
			},
			items: {
				...prev[category].items,
				...newItems
			}
		}
	};

	// console.log('newData', newData);
	return newData;
}
