import type { RGB } from '../types';
import { getAverageRGB } from './getColor';

export const blob2base64 = async (blobUrl: string): Promise<[string, RGB]> => {
	const img = new Image();
	img.src = blobUrl;
	await onload2promise(img);
	const canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d');

	const size = 250;
	let height = 0;
	let width = 0;

	if (img.naturalWidth == img.naturalHeight) {
		height = size;
		width = size;

		canvas.height = height;
		canvas.width = width;
		ctx.drawImage(img, 0, 0, width, height);
	}
	if (img.naturalWidth > img.naturalHeight) {
		width = size;
		height = (size / img.naturalWidth) * img.naturalHeight;

		canvas.width = width;
		canvas.height = height;

		ctx.drawImage(img, 0, 0, width, height);
	}
	if (img.naturalHeight > img.naturalWidth) {
		height = size;
		width = (size / img.naturalHeight) * img.naturalWidth;

		canvas.width = width;
		canvas.height = height;

		ctx.drawImage(img, 0, 0, width, height);
	}

	return [
		canvas.toDataURL('image/jpeg;base64;'),
		getAverageRGB(ctx.getImageData(0, 0, width, height).data)
	];
};

interface OnLoadAble {
	onload: any;
}
export const onload2promise = <T extends OnLoadAble>(obj: T): Promise<T> => {
	return new Promise((resolve, reject) => {
		obj.onload = () => resolve(obj);
		//obj.onerror = reject;
	});
};

const convertRemToPixels = (rem) =>
	rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
