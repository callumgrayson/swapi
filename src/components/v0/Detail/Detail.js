import React from 'react';
import './Detail.css';

const uuid = require('uuid/v4');

function handleValue(val) {
	// Handle strings & numbers
	if (typeof val === 'string' || typeof val === 'number') {
		return val;
	}

	// Handle arrays
	if (Array.isArray(val)) {
		const vals = [];

		for (let item of val) {
			vals.push(handleValue(item));
		}

		return <div>{vals.map((k) => <div key={uuid()}>{k}</div>)}</div>;
	}

	// Handle all other types
	return JSON.stringify(val);
}

const Detail = (props) => {
	const detailObj = props.detail;

	return (
		<div className="detail-box">
			<h2>{detailObj['name']}</h2>
			<div className="columnsBox">
				<div className="columns">
					{detailObj &&
						Object.keys(detailObj).map((key) => (
							<div key={uuid()} className="keyValBox">
								<div className="col detailKey">{key}</div>
								<div className="col detailValue">
									{handleValue(detailObj[key])}
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Detail;
