export const capitalize = (str) => {
	return str
		.split(' ')
		.map((word) => {
			return `${word[0].toUpperCase()}${word.slice(1)}`;
		})
		.join(' ');
};

export const removeUnderscores = (str) => str.replace(/_/g, ' ');
