import React from 'react';
import './PageLinks.css';

import CONSTANTS from '../../../constants.json';
const uuid = require('uuid/v4');

const PageLinks = (props) => {
	const { changePage, currentPage, pageLinks } = props;

	return (
		<div className="v6_pageLinks">
			{pageLinks &&
				pageLinks.length > 0 &&
				pageLinks.map((link) => {
					return (
						<span
							className="v6_button v6_pageLink"
							style={{
								color: `${currentPage === link
									? CONSTANTS.SW_COLOR
									: 'inherit'}`
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
