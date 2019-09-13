import React from 'react';

import CONSTANTS from '../../../constants.json';
const uuid = require('uuid/v4');

const Pages = (props) => {
	const { pageItems, changeItem, currentItem } = props;
	return (
		<div className="v6_menu">
			<div className="v6_menuItems">
				{pageItems &&
					pageItems.length > 0 &&
					pageItems.map((item) => (
						<div
							className="v6_button"
							key={uuid()}
							onClick={() => changeItem(item.itemId)}
							style={{
								color: `${currentItem === item.itemId
									? CONSTANTS.SW_COLOR
									: 'inherit'}`
							}}
						>
							{item.itemName}
						</div>
					))}
			</div>
			{props.children}
		</div>
	);
};

export default Pages;
