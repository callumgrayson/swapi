import React from 'react';
import results from './results.json';

const Sorter = () => {
	const ids = results.map((item) => item.episode_id);
	const idTitle = results.map((item) => {
		return { episode_id: item.episode_id, title: item.title };
	});
	// console.log('results', results);
	// console.log('ids', ids);
	// console.log('idTitle', idTitle);
	let sort1 = ids.sort();
	let sort2 = ids.sort((a, b) => a - b);
	let sort3 = results.sort((a, b) => a.episode_id - b.episode_id);
	return (
		<div>
			<div>{JSON.stringify(ids)}</div>
			<div>{JSON.stringify(sort1)}</div>
			<div>{JSON.stringify(sort2)}</div>
			<div>
				{idTitle.map((el, i) => (
					<div key={i}>
						{el.episode_id} - {el.title}
					</div>
				))}
				<br />
			</div>
			<br />
			<div>
				{sort3.map((el, i) => (
					<div key={i}>
						<div>
							{el.episode_id} - {el.title} -{el.director}
						</div>
						<div>{el.opening_crawl}</div>
						<br />
					</div>
				))}
				<br />
			</div>
		</div>
	);
};

export default Sorter;
