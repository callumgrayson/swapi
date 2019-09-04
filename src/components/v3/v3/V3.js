import React from 'react';
import useSwApi from '../hooks/useSwApi';
import Detail from '../Detail/Detail';
import Results from '../Results/Results';
import Loader from '../Loader/Loader';

import starWarsLogo from '../../../img/Star_Wars_Logo.svg';
import appConstants from '../../../constants.json';
import './V3.css';

const uuid = require('uuid/v4');

function V2(props) {
	const [
		{ categories, data, isFetching, error, term, page, count, detail },
		{ setTerm, setPage, setError, setDetail }
	] = useSwApi();

	const { setVersion } = props;

	const handleSearch = async (params) => {
		const { searchTerm, searchPage } = params;
		setTerm(searchTerm);
		setPage(searchPage);
	};

	function showDetail(name) {
		let res;
		for (res of data[term][page]) {
			if (res.name === name) {
				setDetail(res);
				break;
			}
		}
	}

	return (
		<div className="v3">
			<header>
				<div className="star-wars">
					<img
						src={starWarsLogo}
						alt="Star Wars Logo"
						onClick={(e) => setVersion('0')}
					/>
				</div>

				{categories.map((cat) => (
					<button
						className="search-button"
						key={uuid()}
						id={cat}
						onClick={() =>
							handleSearch({ searchTerm: cat, searchPage: 1 })}
						style={{
							color: `${cat === term && appConstants.SW_COLOR}`
						}}
					>
						{`${cat[0].toUpperCase()}${cat.slice(1)}`}
					</button>
				))}
			</header>
			<div className="fetch-content">
				{isFetching && !data.results ? (
					<div className="loader-wrapper">
						<Loader />
					</div>
				) : (
					<React.Fragment>
						<Results
							data={data}
							count={count}
							page={page}
							fetching={isFetching}
							error={error}
							term={term}
							showDetailHandler={showDetail}
							searchHandler={handleSearch}
							setError={setError}
							detail={detail}
						/>

						{JSON.stringify(detail) !== '{}' && (
							<Detail detail={detail} data={data} />
						)}
					</React.Fragment>
				)}
			</div>
		</div>
	);
}

export default V2;
