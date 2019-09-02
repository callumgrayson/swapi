import React, { useState } from 'react';
import V1 from '../v1/v1/V1';
import V2 from '../v2/v2/V2';
import './App.css';

import starWarsLogo from '../../img/Star_Wars_Logo.svg';
import appConstants from '../../constants.json';

function App() {
	const [ version, setVersion ] = useState('0');

	const handleChange = (e) => {
		setVersion(e.target.value);
	};

	return (
		<div className="app">
			{/* <div className="select"> */}
			<select className="select" value={version} onChange={handleChange}>
				<option value="0">start</option>
				<option value="1">version 1</option>
				<option value="2">version 2</option>
			</select>
			{/* </div> */}

			{version === '0' && (
				<div className="welcome-box">
					<div className="star-wars">
						<img src={starWarsLogo} alt="Star Wars Logo" />
					</div>

					<h3>Welcome to your interface for the Star Wars API.</h3>
					<h3>
						Enter and follow your nose for all kinds of Star Wars
						facts and stats from films 1 - 7.
					</h3>
					<div className="go-box">
						<button
							className="go-button"
							onClick={(e) => setVersion('2')}
							style={{
								borderColor: `${appConstants.SW_COLOR}`
							}}
						>
							Let's Go!
						</button>
					</div>
				</div>
			)}
			{version === '1' && <V1 />}
			{version === '2' && <V2 />}
		</div>
	);
}

export default App;
