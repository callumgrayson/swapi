import React from 'react';

import './Loader.css';

import ligthsaber from '../../img/lightsaber_blue2.png';

const Loader = () => (
	<div className="loader-box">
		<img className="lightsaber" src={ligthsaber} alt="Lightsaber blue" />
	</div>
);

export default Loader;
