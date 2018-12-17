const $ = element => document.querySelector(element);
const $$ = elements => [...document.querySelectorAll(elements)];
const getSVGPathLength = path => $(path) && $(path).getTotalLength();
const isCSSVariablesSupported = () => 'setProperty' in document.documentElement.style;
const setCSSCustomProperty = (prop, val) => isCSSVariablesSupported &&
	document.documentElement.style.setProperty(prop, val);
const waitASec = (sec = 1) => new Promise(res => setTimeout(res, sec * 1000));

const computeOffset = () => {
	const last = $('section:last-child');
	const { left, width } = last.getBoundingClientRect()
	const offset = Math.ceil(left + width + 1);
	setCSSCustomProperty('--offset', offset)
}

document.addEventListener('DOMContentLoaded', () => {
	const color = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
	$$('[line]').map(line => line.style.stroke = color);
	$$('[wave]').map(wave => wave.style.stroke = color);

	const hellos = $$('[hello]');
	$('[hello]:last-of-type').addEventListener('animationend', () => {
		hellos.map((hello, index) => {
			hello.removeAttribute('show');
			waitASec().then(() => hello.setAttribute('show', true));
		});
	});

	const length = Math.ceil(getSVGPathLength('[wave]'));
	setCSSCustomProperty('--wave-length', length)

	computeOffset();
});

window.addEventListener('resize', computeOffset, { passive: true });