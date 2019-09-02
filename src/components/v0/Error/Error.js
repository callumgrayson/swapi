import React from 'react';
import './Error.css';

const Error = ({ errorDisplay, resetAction }) => {
	return (
		<div className="error">
			<div>Encountered an error:</div>
			<div>{`${errorDisplay}`}</div>
			<button className="reset-button" onClick={resetAction}>
				Continue
			</button>
		</div>
	);
};

export default Error;
