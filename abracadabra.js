const $ = element => document.querySelector(element);
const $$ = elements => [...document.querySelectorAll(elements)];
const chill = seconds => new Promise(res => setTimeout(res, seconds * 1000));
const getSVGPathLength = path => $(path) && $(path).getTotalLength();
const isCSSVariablesSupported = () => 'setProperty' in document.documentElement.style;
const setCSSCustomProperty = (prop, val) => isCSSVariablesSupported &&
	document.documentElement.style.setProperty(prop, val);

const computeOffset = () => {
	const last = $('section:last-child');
	const { left, width } = last.getBoundingClientRect()
	const offset = Math.ceil(left + width + 1);
	setCSSCustomProperty('--offset', offset)
}

const followTheWhiteCursor = () => {
	document.addEventListener('mousemove', ({ pageX, pageY }) => {
		setCSSCustomProperty('--x', `${pageX}px`)
		setCSSCustomProperty('--y', `${pageY}px`)
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const color = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
	const hells = $$('[hell]');
	const lines = $$('[line]');
	const waves = $$('[wave]');
	
	hells.map(({ style }, index) => style.animationDelay = `${1 + 0.1 * index}s`);
	lines.map(line => line.style.stroke = color);
	waves.map(({ style }, index) => {
		style.stroke = color;
		style.animationDelay = `${1 + 0.1 * index}s`
	});
	
	$('[hell]:last-of-type').addEventListener('animationend', () => {
		hells.map(async (hell) => {
			hell.removeAttribute('show');
			await chill(1);
			hell.setAttribute('show', true);
		});
	});

	const length = Math.ceil(getSVGPathLength('[wave]'));
	setCSSCustomProperty('--wave-length', length)

	computeOffset();
	followTheWhiteCursor()
});

window.addEventListener('resize', computeOffset, { passive: true });