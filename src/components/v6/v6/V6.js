import React, { useState, useEffect } from 'react';
import useSwApi from '../hooks/useSwApi';

import Categories from '../displays/Categories';
import Pages from '../displays/Pages';
import PageLinks from '../displays/PageLinks';
import Detail from '../displays/Detail';
import Header from '../displays/Header';

import './V6.css';
import { getUrlInfo } from '../helpers/helpers';

const V6 = () => {
	const [ displayCategory, setDisplayCategory ] = useState('planets');
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
			let { pageItems } = currentItemData;

			let newDisplayPage = 1;

			if (
				pageItems &&
				pageItems.length > 0 &&
				getUrlInfo(pageItems[0].itemId)[0] !== displayCategory
			) {
				newDisplayPage = 1;
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
				/>
			</Content>
		</div>
	);
};

export default V6;
