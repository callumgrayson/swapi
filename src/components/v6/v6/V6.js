import React, { useState, useEffect } from 'react';
import useSwApi from '../hooks/useSwApi';

import Categories from '../components/Categories';
import Pages from '../components/Pages';
import Detail from '../components/Detail';

import './V6.css';

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
			setRequestForItem(displayItem);
		},
		[ displayItem, setRequestForItem ]
	);

	const Header = () => <div>Header</div>;
	const Content = (props) => (
		<div className="v6_content">{props.children}</div>
	);
	const PageLinks = () => <div>PageLinks</div>;

	return (
		<div className="v6_page">
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
