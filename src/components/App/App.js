import React, { useState } from 'react';

import Intro from '../Intro/Intro';
import V1 from '../v1/v1/V1';
import V2 from '../v2/v2/V2';

import './App.css';

function App() {
	const [ version, setVersion ] = useState('2');

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

			{version === '0' && <Intro setVersion={setVersion} />}
			{version === '1' && <V1 />}
			{version === '2' && <V2 setVersion={setVersion} />}
		</div>
	);
}

export default App;
