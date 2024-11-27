import React, {type ReactNode} from "react";

import {type GetDynamicEntityListParams} from "../content";
import {useDynamicEntityList, type UseDynamicEntityListOptions} from "../hooks";
import type {
	DynamicEntityList as DynamicEntityListType,
	DynamicEntityProps as DynamicEntityPropsType,
	EntityType,
} from "../types";
import Debug from "./debug";

export type DynamicEntityListClientRenderProps<T = object, P = object> = {
	entityList: DynamicEntityListType<T>;
	params?: GetDynamicEntityListParams<P>;
	ref?: (node?: Element | null | undefined) => void;
	Item?: ({entityProps}: {entityProps: DynamicEntityPropsType<T>}) => ReactNode;
};

export type DynamicEntityListProps<T, P> = {
	entitySlug?: string;
	entityType?: EntityType;
	options?: UseDynamicEntityListOptions;
	Render?: (props: DynamicEntityListClientRenderProps<T, P>) => ReactNode;
};

function makeDynamicEntityListClient(wpURL: string) {
	// prettier-ignore
	const DynamicEntityListClient = <T={}, P = {}>({
		entitySlug = "post",
		entityType = "post",
		options = {},
		Render = ({entityList = [], params, ref}) => (
			<div className="p-4" ref={ref}>
				<h2 className="mb-3">List with {params?.count} items.</h2>
				<div className="grid grid-cols-3 gap-4">
					{entityList.map((item) => (
						<div className="overflow-hidden border" key={item.entityId}>
							<Debug value={item} />
						</div>
					))}
				</div>
			</div>
		),
	}: DynamicEntityListProps<T, P>) => {
		const {entityList, params, ref} = useDynamicEntityList<T, P>(
			wpURL,
			entitySlug,
			entityType,
			options,
		);
		if (!entityList) {
			return null;
		}

		return <Render entityList={entityList} params={params} ref={ref} />;
	};

	return DynamicEntityListClient;
}

export default makeDynamicEntityListClient;
