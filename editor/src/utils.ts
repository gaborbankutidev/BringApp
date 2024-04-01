import {ImageType, MediaType} from "./types";

export const defaultImageValue = {
	id: null,
	src: "https://wp-template.bringblocks.com/wp-content/uploads/screenshot.jpg",
	alt: "Bring Theme Placeholder Image",
};

export const defaultMediaValue: MediaType = {
	id: null,
	src: "https://wp-template.bringblocks.com/wp-content/uploads/screenshot.jpg",
	alt: "Bring Theme Placeholder Image",
};

export const objectKeys = <Obj extends object>(obj?: Obj): (keyof Obj)[] => {
	return obj ? (Object.keys(obj) as (keyof Obj)[]) : [];
};

export const capitalize = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1);
