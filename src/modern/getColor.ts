import type { RGB } from '../types';
import { onload2promise } from './blob2base64';

export const getColors = (averageColor: RGB) => {
	const rgb = averageColor;
	const [h] = rgbToHsl(rgb.r, rgb.g, rgb.b);
	const s = 0.19;
	return {
		2: hslToHex(h, s, 0.02),
		6: hslToHex(h, s, 0.06),
		14: hslToHex(h, s, 0.14),
		35: hslToHex(h, s, 0.35),
		80: hslToHex(h, s, 0.8),
		96: hslToHex(h, s, 0.96)
	};
};

export let getAverageRGBFromImage = async (base64: string) => {
	const img = new Image();
	img.src = base64;
	await onload2promise(img);
	const canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d');

	canvas.height = img.naturalHeight;
	canvas.width = img.naturalWidth;
	ctx.drawImage(img, 0, 0);

	return getAverageRGB(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
};

export const getAverageRGB = (data: Uint8ClampedArray) => {
	const blockSize = 5;
	const rgb = { r: 0, g: 0, b: 0 };
	let count = 0;
	let i = -4;

	const length = data.length;

	while ((i += blockSize * 4) < length) {
		++count;
		rgb.r += data[i];
		rgb.g += data[i + 1];
		rgb.b += data[i + 2];
	}

	// ~~ used to floor values
	rgb.r = ~~(rgb.r / count);
	rgb.g = ~~(rgb.g / count);
	rgb.b = ~~(rgb.b / count);

	return rgb;
};

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
export const rgbToHsl = (r: number, g: number, b: number) => {
	(r /= 255), (g /= 255), (b /= 255);

	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	var h: number,
		s: number,
		l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}

		h /= 6;
	}

	return [h, s, l];
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
export const hslToRgb = (h: number, s: number, l: number) => {
	var r: number, g: number, b: number;

	if (s == 0) {
		r = g = b = l; // achromatic
	} else {
		const hue2rgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;

		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return [r * 255, g * 255, b * 255];
};

export const hslToHex = (h: number, s: number, l: number) => {
	const [r, g, b] = hslToRgb(h, s, l);
	return rgbToHex(r, g, b);
};

export const rgbToHex = (r: number, g: number, b: number) => {
	const toHex = (n: number) => ('0' + Math.round(n).toString(16)).slice(-2);
	return '#' + toHex(r) + toHex(g) + toHex(b);
};
