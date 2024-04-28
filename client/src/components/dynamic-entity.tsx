import React, {type ReactNode} from "react";
import {
	getDynamicEntityProps,
	type GetDynamicEntityPropsOptions,
	type GetDynamicEntityPropsParams,
} from "../content";
import type {DynamicEntityProps, EntityType} from "../types";
import Debug from "./debug";

export type EntityProps<T, P> = {
	wpURL: string;
	entityId?: number;
	entityType?: EntityType;
	options?: GetDynamicEntityPropsOptions;
	Render?: ({
		entityProps,
		params,
	}: {
		entityProps: DynamicEntityProps<T>;
		params?: GetDynamicEntityPropsParams<P>;
	}) => ReactNode;
};

async function DynamicEntity<T, P>({
	wpURL,
	entityId = 0,
	entityType = "post",
	options = {},
	Render = (props) => (
		<div className="border">
			<Debug value={props} />
		</div>
	),
}: EntityProps<T, P>) {
	const {entityProps, params} = await getDynamicEntityProps<T, P>(
		wpURL,
		entityId,
		entityType,
		options,
	);
	if (!entityProps) {
		return null;
	}

	return <Render entityProps={entityProps} params={params} />;
}

export default DynamicEntity;
