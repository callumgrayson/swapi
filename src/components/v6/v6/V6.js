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

	useEffect(
		() => {
			setDisplayItem('');
		},
		[ displayPage ]
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
