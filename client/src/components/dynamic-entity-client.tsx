import React, {type ReactNode} from "react";
import {type GetDynamicEntityPropsParams} from "../content";
import {
	useDynamicEntityProps,
	type UseDynamicEntityPropsOptions,
} from "../hooks";
import type {DynamicEntityProps, EntityType} from "../types";
import Debug from "./debug";

export type DynamicEntityPropsClientRenderProps<T, P> = {
	entityProps: DynamicEntityProps<T>;
	params?: GetDynamicEntityPropsParams<P>;
	ref?: (node?: Element | null | undefined) => void;
};

export type EntityProps<T, P> = {
	wpURL: string;
	entityId?: number;
	entityType?: EntityType;
	options?: UseDynamicEntityPropsOptions;
	Render?: (props: DynamicEntityPropsClientRenderProps<T, P>) => ReactNode;
};

function DynamicEntityClient<T, P>({
	wpURL,
	entityId = 0,
	entityType = "post",
	options = {},
	Render = ({ref, ...props}) => (
		<div className="border" ref={ref}>
			<Debug value={props} />
		</div>
	),
}: EntityProps<T, P>) {
	const {entityProps, params, ref} = useDynamicEntityProps<T, P>(
		wpURL,
		entityId,
		entityType,
		options,
	);
	if (!entityProps) {
		return null;
	}

	return <Render entityProps={entityProps} params={params} ref={ref} />;
}

export default DynamicEntityClient;
