import React from 'react';
const uuid = require('uuid/v4');

const categories = [
	'films',
	'people',
	'planets',
	'species',
	'starships',
	'vehicles'
];

const Categories = (props) => {
	const {
		// currentCategory,
		changeCategory
	} = props;
	return (
		<div>
			{categories.map((cat) => (
				<div key={uuid()} onClick={() => changeCategory(cat)}>
					{cat}
				</div>
			))}
		</div>
	);
};

export default Categories;
