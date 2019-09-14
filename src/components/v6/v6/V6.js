import React, { useState, useEffect } from 'react';
import useSwApi from '../hooks/useSwApi';

import Categories from '../displays/Categories';
import Pages from '../displays/Pages';
import PageLinks from '../displays/PageLinks';
import Detail from '../displays/Detail';
import Header from '../displays/Header';

import './V6.css';

const V6 = () => {
	const [ displayCategory, setDisplayCategory ] = useState('planets');
	const [ displayPage, setDisplayPage ] = useState(1);
	const [ displayItem, setDisplayItem ] = useState(''); // eg: 'films_1'

	const [
		{ currentPageData, currentItemData },
		setRequestForPage,
		setRequestForItem,
		error,
		isFetching
	] = useSwApi();

	// Page data sync
	useEffect(
		() => {
			let { pageItems } = currentPageData;

			let newDisplayPage = 1;

			if (
				pageItems &&
				pageItems.length > 0 &&
				pageItems[0].itemId.split('_')[0] !== displayCategory
			) {
				newDisplayPage = 1;
				setDisplayPage(1);
			} else {
				newDisplayPage = displayPage;
			}
			// displayPage changes -> setRequestForPage
			setRequestForPage({
				category: displayCategory,
				page: newDisplayPage
			});
			// console.log('page sync');
		},
		[ displayCategory, displayPage, setRequestForPage ]
	);

	// Item data sync
	useEffect(
		() => {
			// displayItem changes -> setRequestForItem
			setRequestForItem(displayItem);
		},
		[ displayItem, setRequestForItem ]
	);

	// /////////////////////////////////////////////
	// Here down goes
	//
	// const setDisplayCategory = () => {};
	// const setDisplayItem = () => {};
	// const setDisplayPage = () => {};
	// const displayCategory = 'films';
	// const displayItem = 'films_1';
	// const displayPage = 1;
	// const currentPageData = {
	// 	pageItems: [
	// 		{ itemId: 1, itemName: 'The Phantom Menace' },
	// 		{ itemId: 2, itemName: 'The Phantom Menace' },
	// 		{ itemId: 3, itemName: 'The Phantom Menace' },
	// 		{ itemId: 4, itemName: 'The Phantom Menace' },
	// 		{ itemId: 5, itemName: 'The Phantom Menace' },
	// 		{ itemId: 'films_1', itemName: 'Sentinel-class landing craft' },
	// 		{ itemId: 7, itemName: 'Sentinel-class landing craft' },
	// 		{ itemId: 8, itemName: 'Sentinel-class landing craft' },
	// 		{ itemId: 9, itemName: 'Sentinel-class landing craft' },
	// 		{ itemId: 10, itemName: 'Sentinel-class landing craft' }
	// 	],
	// 	pageLinks: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
	// };
	// const currentItemData = {
	// 	title: 'The Phantom Menace',
	// 	episode_id: 1,
	// 	opening_crawl:
	// 		'Turmoil has engulfed the\r\nGalactic Republic. The taxation\r\nof trade routes to outlying star\r\nsystems is in dispute.\r\n\r\nHoping to resolve the matter\r\nwith a blockade of deadly\r\nbattleships, the greedy Trade\r\nFederation has stopped all\r\nshipping to the small planet\r\nof Naboo.\r\n\r\nWhile the Congress of the\r\nRepublic endlessly debates\r\nthis alarming chain of events,\r\nthe Supreme Chancellor has\r\nsecretly dispatched two Jedi\r\nKnights, the guardians of\r\npeace and justice in the\r\ngalaxy, to settle the conflict....',
	// 	director: 'George Lucas',
	// 	producer: 'Rick McCallum',
	// 	release_date: '1999-05-19',
	// 	characters: [
	// 		{
	// 			url: 'https://swapi.co/api/people/2/',
	// 			itemName: 'R2-D2',
	// 			itemId: 'people_2',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/3/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'people_3',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/10/',
	// 			itemName: 'R2-D2',
	// 			itemId: 'people_10',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/11/',
	// 			itemName: 'Senator Grievous',
	// 			itemId: 'people_11',
	// 			isFetching: false,
	// 			error: 'Special test error'
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/16/',
	// 			itemName: 'Dantooine',
	// 			itemId: 'people_16',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/20/',
	// 			itemName: 'Senator Grievous',
	// 			itemId: 'people_20',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/21/',
	// 			itemName: 'Darth Vader',
	// 			itemId: 'people_21',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/32/',
	// 			itemName: 'Dantooine',
	// 			itemId: 'people_32',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/33/',
	// 			itemName: 'Darth Vader',
	// 			itemId: 'people_33',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/34/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'people_34',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/36/',
	// 			itemName: 'R2-D2',
	// 			itemId: 'people_36',
	// 			isFetching: false,
	// 			error: 'Special test error'
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/37/',
	// 			itemName: 'Senator Grievous',
	// 			itemId: 'people_37',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/38/',
	// 			itemName: 'Dantooine',
	// 			itemId: 'people_38',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/39/',
	// 			itemName: 'Dantooine',
	// 			itemId: 'people_39',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/40/',
	// 			itemName: 'Senator Grievous',
	// 			itemId: 'people_40',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/41/',
	// 			itemName: 'Senator Grievous',
	// 			itemId: 'people_41',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/42/',
	// 			itemName: 'Dantooine',
	// 			itemId: 'people_42',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/43/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'people_43',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/44/',
	// 			itemName: 'R2-D2',
	// 			itemId: 'people_44',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/46/',
	// 			itemName: 'R2-D2',
	// 			itemId: 'people_46',
	// 			isFetching: false,
	// 			error: 'Special test error'
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/48/',
	// 			itemName: 'Dantooine',
	// 			itemId: 'people_48',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/49/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'people_49',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/50/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'people_50',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/51/',
	// 			itemName: 'Darth Vader',
	// 			itemId: 'people_51',
	// 			isFetching: false,
	// 			error: 'Special test error'
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/52/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'people_52',
	// 			isFetching: false,
	// 			error: 'Special test error'
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/53/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'people_53',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/54/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'people_54',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/55/',
	// 			itemName: 'R2-D2',
	// 			itemId: 'people_55',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/56/',
	// 			itemName: 'R2-D2',
	// 			itemId: 'people_56',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/57/',
	// 			itemName: 'Dantooine',
	// 			itemId: 'people_57',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/58/',
	// 			itemName: 'Senator Grievous',
	// 			itemId: 'people_58',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/59/',
	// 			itemName: 'Darth Vader',
	// 			itemId: 'people_59',
	// 			isFetching: false,
	// 			error: 'Special test error'
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/47/',
	// 			itemName: 'Dantooine',
	// 			itemId: 'people_47',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/people/35/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'people_35',
	// 			isFetching: true,
	// 			error: 'Special test error'
	// 		}
	// 	],
	// 	planets: [
	// 		{
	// 			url: 'https://swapi.co/api/planets/8/',
	// 			itemName: 'Senator Grievous',
	// 			itemId: 'planets_8',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/planets/9/',
	// 			itemName: 'Dantooine',
	// 			itemId: 'planets_9',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/planets/1/',
	// 			itemName: 'Darth Vader',
	// 			itemId: 'planets_1',
	// 			isFetching: false,
	// 			error: 'Special test error'
	// 		}
	// 	],
	// 	starships: [
	// 		{
	// 			url: 'https://swapi.co/api/starships/40/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'starships_40',
	// 			isFetching: false,
	// 			error: 'Special test error'
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/starships/41/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'starships_41',
	// 			isFetching: false,
	// 			error: 'Special test error'
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/starships/31/',
	// 			itemName: 'Senator Grievous',
	// 			itemId: 'starships_31',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/starships/32/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'starships_32',
	// 			isFetching: true,
	// 			error: 'Special test error'
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/starships/39/',
	// 			itemName: 'Darth Vader',
	// 			itemId: 'starships_39',
	// 			isFetching: true,
	// 			error: ''
	// 		}
	// 	],
	// 	vehicles: [
	// 		{
	// 			url: 'https://swapi.co/api/vehicles/33/',
	// 			itemName: 'Senator Grievous',
	// 			itemId: 'vehicles_33',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/vehicles/34/',
	// 			itemName: 'Darth Vader',
	// 			itemId: 'vehicles_34',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/vehicles/35/',
	// 			itemName: 'Dantooine',
	// 			itemId: 'vehicles_35',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/vehicles/36/',
	// 			itemName: 'Dantooine',
	// 			itemId: 'vehicles_36',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/vehicles/37/',
	// 			itemName: 'Darth Vader',
	// 			itemId: 'vehicles_37',
	// 			isFetching: false,
	// 			error: 'Special test error'
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/vehicles/38/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'vehicles_38',
	// 			isFetching: true,
	// 			error: 'Special test error'
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/vehicles/42/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'vehicles_42',
	// 			isFetching: true,
	// 			error: ''
	// 		}
	// 	],
	// 	species: [
	// 		{
	// 			url: 'https://swapi.co/api/species/1/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'species_1',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/species/2/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'species_2',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/species/6/',
	// 			itemName: 'R2-D2',
	// 			itemId: 'species_6',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/species/11/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'species_11',
	// 			isFetching: true,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/species/12/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'species_12',
	// 			isFetching: false,
	// 			error: 'Special test error'
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/species/25/',
	// 			itemName: 'Darth Vader',
	// 			itemId: 'species_25',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/species/26/',
	// 			itemName: 'Sentinel-class landing craft',
	// 			itemId: 'species_26',
	// 			isFetching: false,
	// 			error: ''
	// 		},
	// 		{
	// 			url: 'https://swapi.co/api/species/27/',
	// 			itemName: 'R2-D2',
	// 			itemId: 'species_27',
	// 			isFetching: true,
	// 			error: ''
	// 		}
	// 	],
	// 	created: '2014-12-19T16:52:55.740000Z',
	// 	edited: '2015-04-11T09:45:18.689301Z',
	// 	url: [ { url: 'https://swapi.co/api/films/4/' } ],
	// 	name: 'The Phantom Menace'
	// };

	//
	// /////////////////////////////////////////////

	const Content = (props) => (
		<div className="v6_content">{props.children}</div>
	);

	return (
		<div className="v6_page">
			<Header />
			<Content>
				<Categories
					currentCategory={displayCategory}
					changeCategory={setDisplayCategory}
				/>
				<Pages
					currentItem={displayItem}
					pageItems={currentPageData.pageItems}
					changeItem={setDisplayItem}
					error={error}
					isFetching={isFetching}
				>
					<PageLinks
						currentPage={displayPage}
						pageLinks={currentPageData.pageLinks}
						changePage={setDisplayPage}
					/>
				</Pages>
				<Detail
					currentCategory={displayCategory}
					currentItem={displayItem}
					itemData={currentItemData}
					pageItems={currentPageData.pageItems}
					isFetching={isFetching}
				/>
			</Content>
		</div>
	);
};

export default V6;
