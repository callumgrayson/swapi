import React, { useState } from 'react';

import Intro from '../Intro/Intro';
import V1 from '../v1/v1/V1';
import V2 from '../v2/v2/V2';
import V3 from '../v3/v3/V3';
import V4 from '../v4/v4/V4';
import V5 from '../v5/v5/V5';

import './App.css';

function App() {
	const [ version, setVersion ] = useState('5');

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
				<option value="3">version 3</option>
				<option value="4">version 4</option>
				<option value="5">version 5</option>
			</select>
			{/* </div> */}

			{version === '0' && <Intro setVersion={setVersion} />}
			{version === '1' && <V1 />}
			{version === '2' && <V2 setVersion={setVersion} />}
			{version === '3' && <V3 setVersion={setVersion} />}
			{version === '4' && <V4 setVersion={setVersion} />}
			{version === '5' && <V5 setVersion={setVersion} />}
		</div>
	);
}

export default App;
