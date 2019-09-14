import React from 'react';

import './Loader.css';

// import ligthsaber from '../../../img/lightsaber_blue2.png';
import ligthsaber from '../../../../img/lightsaber_blue2.png';

const Loader = () => (
	<div className="v6_loader-box">
		<img className="v6_lightsaber" src={ligthsaber} alt="Lightsaber blue" />
	</div>
);

export default Loader;
