import allData from './allData.json';

export function getItemNumbers() {
	let idsArray = Object.keys(allData).map((category) => {
		return Object.keys(allData[category]).reduce((acc, pageNumber) => {
			let arr = allData[category][pageNumber];
			let newItems = [];
			if (Array.isArray(arr)) {
				newItems = arr.map((item) => {
					const [ category, idNumber ] = item.url
						.replace('https://swapi.co/api/', '')
						.split('/');

					const name = item.name;

					return {
						idNumber,
						id: `${category}_${idNumber}`,
						category,
						name
					};
				});

				return (acc = [ ...acc, ...newItems ]);
			} else {
				return acc;
			}
		}, []);
	});

	let sorted = idsArray.map((cat) => {
		return cat.sort((a, b) => {
			return (
				Number.parseInt(a.idNumber, 10) -
				Number.parseInt(b.idNumber, 10)
			);
		});
	});

	let idsObj = () => {
		let asObject = {};

		sorted.forEach((cat) => {
			const catName = cat[0].category;
			asObject[catName] = {};

			cat.forEach((item) => {
				let id = item.id;
				asObject[catName][id] = {
					idNumber: item.idNumber,
					category: item.category,
					name: item.name
				};
			});
		});

		return asObject;
	};

	console.log('idsArray', idsArray);
	console.log('sorted', sorted);
	// console.log(JSON.stringify(sorted));
	console.log('idsObj()', JSON.stringify(idsObj()));
}
