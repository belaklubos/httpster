const $ = element => document.querySelector(element);
const $$ = elements => [...document.querySelectorAll(elements)];
const getSVGPathLength = path => $(path) && $(path).getTotalLength();
const isCSSVariablesSupported = () => 'setProperty' in document.documentElement.style;
const setCSSCustomProperty = (prop, val) => isCSSVariablesSupported 
	&& document.documentElement.style.setProperty(prop, val);

const computeOffset = () => {
	const last = $('section:last-child');
	const { left, width } = last.getBoundingClientRect()
	const offset = Math.ceil(left + width);
	setCSSCustomProperty('--offset', offset)
}

document.addEventListener('DOMContentLoaded', () => {
	const length = Math.ceil(getSVGPathLength('#waves path'));
	setCSSCustomProperty('--wave-length', length)
	computeOffset();
});

window.addEventListener('resize', computeOffset);