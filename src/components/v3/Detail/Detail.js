import React from 'react';
import { capitalize, removeUnderscores } from '../helpers/textHelpers';
import './Detail.css';

const uuid = require('uuid/v4');

const formatText = (str) => {
	let retStr = removeUnderscores(str);
	return capitalize(retStr);
};

const formatValue = (str) => {
	if (
		!Number.isNaN(Number.parseFloat(str, 10)) &&
		Number.parseFloat(str, 10).toString() === str
	) {
		// console.log('str', str);
		return Number.parseFloat(str, 10).toLocaleString();
	}
	return str;
};

const getRenderObj = (inObj) => {
	// console.log('inObj', inObj);
	const outObj = {
		name: '',
		singles: {},
		lists: {},
		technical: {},
		crawl: {}
	};

	const technicalKeys = [ 'created', 'edited', 'url' ];

	const getDisplayItem = (val) => {
		// val has been checked and is a url
		let termAndId = val.replace('https://swapi.co/api/', '').split('/');

		const [ term, id ] = termAndId;

		return {
			term: term,
			id: id,
			page: getPage(id)
		};
	};

	const getPage = (num) => {
		return Math.ceil(num / 10);
	};

	const getIsUrl = (val) => {
		if (!(typeof val === 'string')) {
			// console.warn('val not string: ', val);
			return null;
		}
		return val.includes('https://swapi.co/api/') ? true : false;
	};

	Object.keys(inObj).forEach((item) => {
		if (item === 'name') {
			outObj[item] = inObj[item];
		} else if (item === 'opening_crawl') {
			// console.log('inObj', inObj);
			outObj['crawl'] = { [item]: inObj[item] };
		} else if (technicalKeys.includes(item)) {
			outObj.technical[item] = inObj[item];
		} else if (Array.isArray(inObj[item])) {
			outObj.lists[item] = inObj[item].map((val) => {
				if (getIsUrl(val)) {
					return getDisplayItem(val);
				} else {
					return val;
				}
			});
		} else {
			if (getIsUrl(inObj[item])) {
				outObj.singles[item] = getDisplayItem(inObj[item]);
			} else {
				outObj.singles[item] = inObj[item];
			}
		}
	});

	return outObj;
};

const renderCrawl = (inObj) => {
	return (
		<div className="v3-columns-box crawl">
			<div className="v3-left">
				{Object.keys(inObj).map((singlesKey) => (
					<div key={uuid()} className="v3-single-key">
						{formatText(singlesKey)}
					</div>
				))}
			</div>
			<div className="v3-right">
				{Object.keys(inObj).map((singlesKey) => (
					<div key={uuid()} className="v3-single-value">
						{typeof inObj[singlesKey] === 'string' ? (
							inObj[singlesKey]
						) : (
							''
						)}
					</div>
				))}
			</div>
		</div>
	);
};

const renderSingles = (inObj) => {
	return (
		<div className="v3-columns-box">
			<div className="v3-left">
				{Object.keys(inObj).map((singlesKey) => (
					<div key={uuid()} className="v3-single-key">
						{formatText(singlesKey)}
					</div>
				))}
			</div>
			<div className="v3-right">
				{Object.keys(inObj).map((singlesKey) => (
					<div key={uuid()} className="v3-single-value">
						{typeof inObj[singlesKey] === 'string' ||
						typeof inObj[singlesKey] === 'number' ? (
							formatValue(inObj[singlesKey])
						) : (
							''
						)}
					</div>
				))}
			</div>
		</div>
	);
};

const Detail = (props) => {
	const detailObj = props.detail;

	const { name, singles, crawl } = getRenderObj(detailObj);

	return (
		<div className="v3-detail-box">
			<h2>{name}</h2>
			{singles && renderSingles(singles)}
			{crawl && renderCrawl(crawl)}
		</div>
	);
};

export default Detail;
