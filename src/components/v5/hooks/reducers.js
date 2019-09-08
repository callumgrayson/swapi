export function getItemId(category, itemNumber) {
	return `${category}_${itemNumber}`;
}

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
		// console.log('data', data);
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
