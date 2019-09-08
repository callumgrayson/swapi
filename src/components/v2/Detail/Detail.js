import React from 'react';
import { capitalize, removeUnderscores } from '../helpers/textHelpers';
import './Detail.css';

const uuid = require('uuid/v4');

const formatText = (str) => {
	let retStr = removeUnderscores(str);
	return capitalize(retStr);
};

const getRenderObj = (inObj) => {
	const outObj = {
		name: '',
		singles: {},
		lists: {},
		technical: {}
	};

	const technicalKeys = [ 'created', 'edited', 'url' ];

	Object.keys(inObj).forEach((item) => {
		if (item === 'name') {
			outObj[item] = inObj[item];
		} else if (technicalKeys.includes(item)) {
			outObj.technical[item] = inObj[item];
		} else if (Array.isArray(inObj[item])) {
			outObj.lists[item] = inObj[item];
		} else {
			outObj.singles[item] = inObj[item];
		}
	});

	return outObj;
};

const renderLists = (inObj) => {
	return (
		<React.Fragment>
			{Object.keys(inObj).map((objKey) => {
				return (
					inObj[objKey].length > 0 && (
						<div key={uuid()} className="v2ListBox">
							<div className="v2detailKey">
								{formatText(objKey)}
							</div>
							{inObj[objKey].map((item) => (
								<div key={uuid()} className="v2detailValue">
									{item}
								</div>
							))}
						</div>
					)
				);
			})}
		</React.Fragment>
	);
};

const renderSingles = (inObj) => {
	return Object.keys(inObj).map((k) => {
		return (
			<div key={uuid()} className="v2keyValBox">
				<div className="v2detailKey">{formatText(k)}:</div>
				<div className="v2detailValue">{inObj[k]}</div>
			</div>
		);
	});
};

const Detail = (props) => {
	const detailObj = props.detail;

	const { name, singles, lists } = getRenderObj(detailObj);

	return (
		<div className="v2detail-box">
			<h2>{name}</h2>
			{singles && renderSingles(singles)}
			{lists && renderLists(lists)}
		</div>
	);
};

export default Detail;
