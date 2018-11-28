const $ = element => document.querySelector(element);
const $$ = elements => [...document.querySelectorAll(elements)];

const fillTheBlackness = () => {
	const last = $('section:last-child');
	const { style } = document.body;
	const { left, width } = last.getBoundingClientRect()
	const offset = Math.ceil(left + width);

	return (
		'setProperty' in style &&
		style.setProperty('--offset', `${offset}px`)
	);
}

window.onload = fillTheBlackness();
window.addEventListener('resize', fillTheBlackness);