import {colorList} from "@/styles";
import {
	alignList,
	directionList,
	entityTypeList,
	justifyList,
	postList,
	sourceList,
	taxonomyList,
	textAlignList,
	textSourceList,
} from "@/utils";
import {makeOptions} from "@bring/blocks-editor";

export const colorOptions = makeOptions([...colorList]);
export const directionOptions = makeOptions([...directionList]);
export const textAlignOptions = makeOptions([...textAlignList]);
export const sourceOptions = makeOptions([...sourceList], false);
export const textSourceOptions = makeOptions([...textSourceList], false);
export const justifyOptions = makeOptions([...justifyList]);
export const alignOptions = makeOptions([...alignList]);
export const entityTypeOptions = makeOptions([...entityTypeList]);
export const postOptions = makeOptions([...postList]);
export const taxonomyOptions = makeOptions([...taxonomyList]);
