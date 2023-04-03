export const defaultImageValue = {id: null, src: "", alt: ""};

export const objectKeys = <Obj extends object>(obj?: Obj): (keyof Obj)[] => {
	return obj ? (Object.keys(obj) as (keyof Obj)[]) : [];
};

export const capitalize = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1);
