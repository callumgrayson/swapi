import React from 'react';
import Loader from '../displays/Loader/Loader';

import CONSTANTS from '../../../constants.json';
const uuid = require('uuid/v4');

const Pages = (props) => {
	const { pageItems, changeItem, currentItem, error, isFetching } = props;

	if (error) {
		return <div>Error: {error}</div>;
	} else if (isFetching) {
		return (
			<div className="v6_loaderBox">
				<Loader />
			</div>
		);
	} else {
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
	}
};

export default Pages;
