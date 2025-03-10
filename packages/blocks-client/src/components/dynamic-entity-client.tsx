import React, { type ReactNode } from "react"
import { type GetDynamicEntityPropsParams } from "../content"
import { useDynamicEntityProps, type UseDynamicEntityPropsOptions } from "../hooks"
import type { DynamicEntityProps, EntityType } from "../types"
import Debug from "./debug"

/**
 * Represents the properties for rendering a dynamic entity.
 * @template T - Additional properties type
 * @template P - Additional parameters type
 * @property entityProps - The dynamic entity properties.
 * @property params - The parameters for retrieving the dynamic entity properties.
 */
export type DynamicEntityPropsClientRenderProps<T = object, P = object> = {
	entityProps: DynamicEntityProps<T>
	params?: GetDynamicEntityPropsParams<P>
	ref?: (node?: Element | null | undefined) => void
}

export type EntityProps<T, P> = {
	entityId?: number
	entityType?: EntityType
	options?: UseDynamicEntityPropsOptions
	Render?: (props: DynamicEntityPropsClientRenderProps<T, P>) => ReactNode
}

function makeDynamicEntityClient(wpURL: string) {
	// prettier-ignore
	const DynamicEntityClient = <T=object, P = object>({
		entityId = 0,
		entityType = "post",
		options = {},
		Render = ({ref, ...props}) => (
			<div className="border" ref={ref}>
				<Debug value={props} />
			</div>
		),
	}: EntityProps<T, P>) => {
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
	};

	return DynamicEntityClient
}

export default makeDynamicEntityClient
