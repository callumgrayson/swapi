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

	Object.keys(inObj).map((item) => {
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

function handleArray(val) {
	// Handle strings & numbers
	if (typeof val === 'string' || typeof val === 'number') {
		return val;
	}

	// Handle arrays
	if (Array.isArray(val)) {
		const vals = [];

		let item;
		for (item of val) {
			vals.push(handleArray(item));
		}

		return vals;
	}

	// Log all other types
	console.log('val not handled: ', val);
}

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
	// console.log('detailObj', detailObj);

	const { name, singles, lists, technical } = getRenderObj(detailObj);

	return (
		<div className="v2detail-box">
			<h2>{name}</h2>
			{singles && renderSingles(singles)}
			{lists && renderLists(lists)}
		</div>
	);
};

export default Detail;

// if (array) { renderArray()} v3
// if (empty) { renderNot()}
// if (url) {renderOnClick()} v3
// if (date) {renderFormattedOrRaw()} v3

// let kFilms = [
// 	'opening_crawl',
// 	'director',
// 	'producer',
// 	'release_date'
// 	// 'characters',
// 	// 'planets',
// 	// 'starships',
// 	// 'vehicles',
// 	// 'species',
// ];

// let kPeople = [
// 	'height',
// 	'mass',
// 	'hair_color',
// 	'skin_color',
// 	'eye_color',
// 	'birth_year',
// 	'gender',
// 	'homeworld',
// 	// 'films',
// 	'species',
// 	'vehicles',
// 	'starships',
// ];

// let kPlanets = [
// 	'rotation_period',
// 	'orbital_period',
// 	'diameter',
// 	'climate',
// 	'gravity',
// 	'terrain',
// 	'surface_water',
// 	'population',
// 	'residents',
// 	'films',
// ];

// let kSpecies = ["classification","designation","average_height","skin_colors","hair_colors","eye_colors","average_lifespan","homeworld","language","people","films"]

// let kStarships = ["model","manufacturer","cost_in_credits","length","max_atmosphering_speed","crew","passengers","cargo_capacity","consumables","hyperdrive_rating","MGLT","starship_class","pilots","films"]

// let kVehicles = ["model","manufacturer","cost_in_credits","length","max_atmosphering_speed","crew","passengers","cargo_capacity","consumables","vehicle_class","pilots","films","created","edited","url"]

// let kCommon = ["name", "films", ]

// let kFilms = [
// 	'title',
// 	'episode_id',
// 	'opening_crawl',
// 	'director',
// 	'producer',
// 	'release_date',
// 	'characters',
// 	'planets',
// 	'starships',
// 	'vehicles',
// 	'species',
// 	'created',
// 	'edited',
// 	'url',
// 	'name'
// ];

// let kPeople = ["name","height","mass","hair_color","skin_color","eye_color","birth_year","gender","homeworld","films","species","vehicles","starships","created","edited","url"]

// let kPlanets = ["name","rotation_period","orbital_period","diameter","climate","gravity","terrain","surface_water","population","residents","films","created","edited","url"]

// let kSpecies = ["name","classification","designation","average_height","skin_colors","hair_colors","eye_colors","average_lifespan","homeworld","language","people","films","created","edited","url"]

// let kStarships = ["name","model","manufacturer","cost_in_credits","length","max_atmosphering_speed","crew","passengers","cargo_capacity","consumables","hyperdrive_rating","MGLT","starship_class","pilots","films","created","edited","url"]

// let kVehicles = ["name","model","manufacturer","cost_in_credits","length","max_atmosphering_speed","crew","passengers","cargo_capacity","consumables","vehicle_class","pilots","films","created","edited","url"]

// let kCommon = ["name", "films", ]
