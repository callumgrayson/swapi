import React from 'react';

import CONSTANTS from '../../../constants.json';
const uuid = require('uuid/v4');

const PageLinks = (props) => {
	const { changePage, currentPage } = props;

	const { pageLinks } = props;
	return (
		<div className="v6_pageLinks">
			{pageLinks &&
				pageLinks.length > 0 &&
				pageLinks.map((link) => {
					return (
						<span
							style={{
								color: `${currentPage === link
									? CONSTANTS.SW_COLOR
									: 'inherit'}`,
								margin: '0 .5rem'
							}}
							key={uuid()}
							value={link}
							onClick={() => changePage(link)}
						>
							{link}
						</span>
					);
				})}
		</div>
	);
};

export default PageLinks;
