import React, { useState } from 'react';
import V1 from '../v1/v1/V1';
import './App.css';

function App() {
	const [ version, setVersion ] = useState('1');

	const handleChange = (e) => {
		setVersion(e.target.value);
	};

	return (
		<div className="app">
			{/* <div className="select"> */}
			<select className="select" value={version} onChange={handleChange}>
				<option value="1">version 1</option>
			</select>
			{/* </div> */}
			{version === '1' && <V1 />}
		</div>
	);
}

export default App;
