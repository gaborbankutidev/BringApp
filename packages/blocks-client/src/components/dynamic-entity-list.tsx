import React, { type ReactNode } from "react"

import {
	getDynamicEntityList,
	type GetDynamicEntityListOptions,
	type GetDynamicEntityListParams,
} from "../content"
import type {
	DynamicEntityList as DynamicEntityListType,
	DynamicEntityProps as DynamicEntityPropsType,
	EntityType,
} from "../types"
import Debug from "./debug"

export type DynamicEntityListRenderProps<T = {}, P = {}> = {
	entityList: DynamicEntityListType<T>
	params?: GetDynamicEntityListParams<P>
	Item?: ({ entityProps }: { entityProps: DynamicEntityPropsType<T> }) => ReactNode
}

export type DynamicEntityListProps<T, P> = {
	entitySlug?: string
	entityType?: EntityType
	options?: GetDynamicEntityListOptions
	Render?: (props: DynamicEntityListRenderProps<T, P>) => ReactNode
}

function makeDynamicEntityList(wpURL: string) {
	const DynamicEntityList = async <T = {}, P = {}>({
		entitySlug = "post",
		entityType = "post",
		options = {},
		Render = ({ entityList = [], params }) => (
			<div className="p-4">
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
		const { entityList, params } = await getDynamicEntityList<T, P>(
			wpURL,
			entitySlug,
			entityType,
			options
		)
		if (!entityList) {
			return null
		}

		return <Render entityList={entityList} params={params} />
	}

	return DynamicEntityList
}

export default makeDynamicEntityList
