import React, { useState } from 'react';
import apiController, { categories } from '../../../helpers/apiController';
import Detail from '../Detail/Detail';
import Results from '../Results/Results';
import Loader from '../Loader/Loader';

import starWarsLogo from '../../../img/Star_Wars_Logo.svg';
import './V1.css';

const uuid = require('uuid/v4');

function V1() {
	const [ data, setData ] = useState([]);
	const [ count, setCount ] = useState(0);
	const [ page, setPage ] = useState(1);
	const [ detail, setDetail ] = useState({});
	const [ fetching, setFetching ] = useState(false);
	const [ error, setError ] = useState('');
	const [ term, setTerm ] = useState('');

	const handleSearch = async (params) => {
		const { searchTerm, searchPage } = params;
		setFetching(true);

		try {
			const data = await apiController(params);
			if (searchTerm !== undefined) {
				setTerm(searchTerm);
			}

			if (data.hasOwnProperty('data')) {
				setData(data.data);

				if (searchPage !== undefined) {
					setPage(searchPage);
				}

				if (data.data.hasOwnProperty('count')) {
					setCount(data.data.count);
				}
			}
			if (data.hasOwnProperty('error')) {
				setError(data.error.toString());
			}
			setFetching(false);
		} catch (error) {
			const errStr = JSON.stringify(error);
			setError(errStr);
		}
	};

	function showDetail(name) {
		let res;
		for (res of data.results) {
			if (res.name === name) {
				setDetail(res);
				break;
			}
		}
	}

	return (
		<div className="v1">
			<header>
				<div className="star-wars">
					<img src={starWarsLogo} alt="Star Wars Logo" />
				</div>

				{categories.map((cat) => (
					<button
						className="search-button"
						key={uuid()}
						id={cat}
						onClick={() =>
							handleSearch({ searchTerm: cat, searchPage: 1 })}
						style={{ color: `${cat === term && '#ffe82f'}` }}
					>
						{`${cat[0].toUpperCase()}${cat.slice(1)}`}
					</button>
				))}
			</header>
			<div className="fetch-content">
				{fetching && !data.results ? (
					<div className="loader-wrapper">
						<Loader />
					</div>
				) : (
					<React.Fragment>
						<Results
							data={data}
							count={count}
							page={page}
							fetching={fetching}
							error={error}
							term={term}
							showDetailHandler={showDetail}
							searchHandler={handleSearch}
							setError={setError}
							detail={detail}
						/>

						{JSON.stringify(detail) !== '{}' && (
							<Detail detail={detail} />
						)}
					</React.Fragment>
				)}
			</div>
		</div>
	);
}

export default V1;
