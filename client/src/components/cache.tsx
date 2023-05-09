import React from "react";
import type {FC} from "react";
import {useBringContext} from "../context";
import {createBringElement} from "../render";

export const Cache: FC = () => {
	const {entityContent, componentMap} = useBringContext();

	return (
		<>
			{entityContent.layout
				? createBringElement(entityContent.layout, componentMap, true)
				: createBringElement(entityContent.main, componentMap)}
		</>
	);
};
