import React from 'react';
import CONSTANTS from '../../../constants.json';
const uuid = require('uuid/v4');

let inCategories = CONSTANTS.categories;
const categories = inCategories.map((cat) => {
	return {
		name: cat,
		display: `${cat[0].toUpperCase()}${cat.slice(1)}`
	};
});

const Categories = (props) => {
	const {
		// currentCategory,
		changeCategory
	} = props;
	return (
		<div className="v6_terms">
			{categories.map((cat) => (
				<div key={uuid()} onClick={() => changeCategory(cat.name)}>
					{cat.display}
				</div>
			))}
		</div>
	);
};

export default Categories;
