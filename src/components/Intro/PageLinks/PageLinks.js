import React from 'react';

const PageLinks = ({ linksArray }) => {
	return (
		<div className="links">
			{linksArray.map((link) => (
				<div
					key={link.key}
					className="page-link"
					onClick={link.clickHandler}
					style={{ color: link.matchColor }}
				>
					{link.display}
				</div>
			))}
		</div>
	);
};

export default PageLinks;
