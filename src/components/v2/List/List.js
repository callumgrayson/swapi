import React from 'react';
import './List.css';

const List = ({ list }) => {
	return (
		<React.Fragment>
			{list.map((item) => {
				return (
					<div key={item.id}>
						<span
							className="list-item"
							onClick={item.clickHandler}
							style={{ color: `${item.color}` }}
						>
							{item.display}
						</span>
					</div>
				);
			})}
		</React.Fragment>
	);
};

export default List;
