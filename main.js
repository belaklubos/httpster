const $ = element => document.querySelector(element);
const $$ = elements => [...document.querySelectorAll(elements)];

const computeOffsets = () => {
	const last = $('section:last-child');
	const { style } = document.documentElement;
	const { left, width } = last.getBoundingClientRect()
	const offset = Math.ceil(left + width);

	if ('setProperty' in style) {
		style.setProperty('--area-width', `${width}px`);
		style.setProperty('--offset', `${offset}px`)
	}
}

window.onload = computeOffsets();
window.addEventListener('resize', computeOffsets);