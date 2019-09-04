import React from 'react';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import PageLinks from '../PageLinks/PageLinks';
import List from '../List/List';
import './Results.css';

import constants from '../../../constants.json';

const uuid = require('uuid/v4');

const Results = (props) => {
	const {
		data,
		page,
		fetching,
		error,
		setError,
		term,
		showDetailHandler,
		searchHandler,
		detail
	} = props;

	const renderPageLinks = (linkCount) => {
		let linksArray = [];

		const linkPagesNeeded = Math.ceil(linkCount / 10) || 1;

		for (let i = 1; i <= linkPagesNeeded; i++) {
			linksArray.push({
				key: uuid(),
				display: i,
				searchTerm: term,
				matchColor: i === page && constants.SW_COLOR,
				clickHandler: () =>
					searchHandler({
						searchPage: i,
						searchTerm: term
					})
			});
		}

		return <PageLinks linksArray={linksArray} />;
	};

	const renderError = () => (
		<Error errorDisplay={error} resetAction={() => setError('')} />
	);

	const renderFetching = () => <Loader />;

	const renderList = () => {
		const listExtended = data[term][page].map((item) => {
			const id = uuid();
			const clickHandler = () => showDetailHandler(item.name);

			return {
				id,
				display: item.name,
				clickHandler: clickHandler,
				color: `${item.name === detail.name && constants.SW_COLOR}`
			};
		});

		return <List list={listExtended} />;
	};

	const renderContent = () => {
		const isData =
			Object.keys(data).length > 0 &&
			data.hasOwnProperty(term) &&
			data[term].hasOwnProperty(page);

		return (
			<div className="content">
				{isData && (
					<div className="results-heading">
						<h2>{term[0].toUpperCase() + term.slice(1)}</h2>
					</div>
				)}

				<div className="results-items">
					{fetching && renderFetching()}
					{!fetching && isData && renderList()}
				</div>

				{isData && (
					<div className="page-links">
						{renderPageLinks(data[term].count)}
					</div>
				)}
			</div>
		);
	};

	const renderResults = () => {
		if (error) {
			return renderError();
		} else {
			return renderContent();
		}
	};

	return <div className="results">{renderResults()}</div>;
};

export default Results;
