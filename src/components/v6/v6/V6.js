// V4 is really PoC
// V5 has the logic layed out better
// Cut and paste and massage the V5 singles stuff
// Cut and paste in the V3/V4 page stuff
// Clearly separate concerns
// Force functions to be pure by splitting and importing
// Refactor logic to be common
//

// Logic / Hooks
// useSwApi
// set category - renders menu + links
// set item - renders data in Detail

// ??? Where is the logic for getting the urls when a Detail is shown ???
// click on menu link to show a Detail item
// click calls a function to change state
// this should set state in a ?local? state which triggers
// a local useEffect that requests the item data
// when the item data is returned after fetch urls trigger could be in two places
// ?? in useSwApi - when data arrives get all urls into array and send array to requestSingles
// ?? OR local function/useEffect when data arrives back get urls and send array to singles
// principle of one job per function
//  - useSwApi

// when data is sought from state, triggers fetch of any urls in detail
// useSwApi
//      data state
//      calls to page api
//      calls to single api
// all data setting through reducer functions
// investigate changing to useReducer for state: data

// check state shape for consistency
// follow v5 state shape
// pages are stored as arrays of ids
// items contains id keys and itemData values
// itemData values contain urls
// any accessed itemData triggers fetch of all singles (ids) in arrays
// these are set as per v5

// api is consistent for both pages and singles fetch
// fetchData.js
//  - function fetchSingle() setData(singleData) setData(singleError) setData(singleIsFetching)
//  - function fetchPage() setData(pageData) setData(pageError) setData(pageIsFetching)
//  !!!! DO NOT DO THIS before setData(pageData) access all urls and add to requestSinglesArray and
//      set state with array !!!!

//* 1 add helpers folder - api.js helpers.js reducers.js fetchData.js
//* 2 add hooks folder - useSwApi.js
// 3 fetchData - fetchPage() fetchSingle()

// Checks
// hooks are consistent and compatible
// reducers are consistent for page fetch and single fetch
// all repeated functions extracted to helpers and imported
//  - helpers.js with text, id, parsing etc
//  - constants in constants.js
//  - idFromUrl
//  - extractIdsFromUrls

// Component logic
//  - handleCategory for setting catergory
//  - handlePage for pageLinks
//  - handleDetail for Detail

// Component Layout
//      some can be Components - only take and render data / no logic
//      ?? or they take 3 state or 1 state data and combine logic/layout
//  Preparation logic separate from display
//  - renderCategories
//  - renderPage
//  - renderPageLinks
//  - renderDetailSection
//  - renderLeft
//  - renderRight
//  - renderKvPairRow
//  - renderKvPairColumn for opening crawl and url Arrays
//      values in wrap row
//  - renderSinglesArray ?
//  - renderSingle incorporates logic for isFetching, error, data states

// Header
// SW Logo clickable to go to start page

// 3 Columns
// Categories
// Page Menu + PageLinks
// Detail

// Detail will be row of 2
// which flex to column of 2

// Detail-Shorts will have 2 columns fixed width
// Left will be the keys
// Right will be the values

// Detail-Arrays will be rows of values
// Key on top
// Values of array beneath

// Render Page as Detail
// Name
// Short Fields
// Arrays of urls

// Arrays of urls
// Render Single of each url
// Name

// loaders
// lightsaber loader for page fetch and link fetch
// ... loader for singles data

// Styled Components later... CSS for now

import React, { useState, useEffect } from 'react';
import useSwApi from '../hooks/useSwApi';

import Categories from '../components/Categories';
import Pages from '../components/Pages';
import Detail from '../components/Detail';

const V6 = () => {
	const [ displayCategory, setDisplayCategory ] = useState('films');
	const [ displayPage, setDisplayPage ] = useState(1);
	const [ displayItem, setDisplayItem ] = useState(''); // eg: 'films_1'

	const [
		{ currentPageData, currentItemData },
		setRequestForPage,
		setRequestForItem
	] = useSwApi();

	// Page data sync
	useEffect(
		() => {
			// displayPage changes -> setRequestForPage
			setRequestForPage({
				category: displayCategory,
				page: displayPage
			});
			// console.log('page sync');
		},
		[ displayCategory, displayPage, setRequestForPage ]
	);

	// Item data sync
	useEffect(
		() => {
			// displayItem changes -> setRequestForItem
			console.log('item sync');
			setRequestForItem(displayItem);
		},
		[ displayItem, setRequestForItem ]
	);

	const Header = () => <div>Header</div>;
	const Content = (props) => <div>{props.children}</div>;
	const PageLinks = () => <div>PageLinks</div>;

	console.log('currentItemData', currentItemData);

	return (
		<div className="v6">
			<Header />
			<Content>
				<Categories
					currentCategory={displayCategory}
					changeCategory={setDisplayCategory}
				/>
				<Pages
					currentPage={displayPage}
					pageItems={currentPageData.pageItems}
					changeItem={setDisplayItem}
				>
					<PageLinks
						currentPage={displayPage}
						pageLinks={currentPageData.pageLinks}
						changePage={(page) => setDisplayPage(page)}
					/>
				</Pages>
				<Detail currentItem={displayItem} itemData={currentItemData} />
			</Content>
		</div>
	);
};

export default V6;
