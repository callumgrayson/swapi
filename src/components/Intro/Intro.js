import React from 'react';
import './Intro.css';

import starWarsLogo from '../../img/Star_Wars_Logo.svg';
import appConstants from '../../constants.json';

const Intro = ({ setVersion }) => {
	return (
		<div className="intro__welcome-box">
			<div className="intro__star-wars">
				<img src={starWarsLogo} alt="Star Wars Logo" />
			</div>

			<h3>Welcome to your interface for the Star Wars API.</h3>
			<h3>
				Enter and follow your nose for all kinds of Star Wars facts and
				stats from films 1 - 7.
			</h3>
			<div className="intro__go-box">
				<button
					className="intro__go-button"
					onClick={(e) => setVersion('2')}
					style={{
						borderColor: `${appConstants.SW_COLOR}`
					}}
				>
					Let's Go!
				</button>
			</div>
		</div>
	);
};

export default Intro;
