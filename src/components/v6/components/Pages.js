import React from 'react';
const uuid = require('uuid/v4');

const Pages = (props) => {
	// console.log('props', props);
	const { pageItems, changeItem, currentPage } = props;
	return (
		<div>
			{pageItems &&
				pageItems.length > 0 &&
				pageItems.map((item) => (
					<div key={uuid()} onClick={() => changeItem(item.itemId)}>
						{item.itemName}
					</div>
				))}
			{props.children}
		</div>
	);
};

export default Pages;
