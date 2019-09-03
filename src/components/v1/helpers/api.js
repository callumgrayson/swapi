function memoize(fn) {
	const cache = {};
	return async function(...args) {
		if (cache[args] && !cache[args].hasOwnProperty('error')) {
			return cache[args];
		}

		const result = await fn.apply(this, args);
		cache[args] = result;

		return result;
	};
}

function checkResponse(resp) {
	if (!resp.ok) {
		const { status, statusText } = resp;
		const errorToReturn = new Error();
		errorToReturn.name = `${status}`;
		errorToReturn.message = `${statusText}`;

		throw errorToReturn;
	}
	return resp;
}

async function fetchAPI(param) {
	try {
		const headers = new Headers();
		headers.append('Content-type', 'application/json');
		headers.append('Accept', 'application/json');

		const resp = await fetch(param, { headers });
		const checkedResp = await checkResponse(resp);
		const json = await checkedResp.json();

		return { data: json };
	} catch (error) {
		return { error };
	}
}

export const memoizedFetch = memoize(fetchAPI);
