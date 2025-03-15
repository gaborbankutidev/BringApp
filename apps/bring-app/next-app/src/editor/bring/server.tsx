/* eslint-disable react-hooks/rules-of-hooks */

import {
	type EntityType,
	type GetDynamicEntityListOptions,
	type GetDynamicEntityPropsOptions,
} from "@bring/blocks-client"
import {
	DynamicEntity as DynamicEntityClient,
	DynamicEntityList as DynamicEntityListClient,
	useDynamicEntityList,
	useDynamicEntityProps,
} from "./client"

import type { JSX } from "react"

export const getDynamicEntityList = (
	entitySlug: string,
	entityType: EntityType,
	options: GetDynamicEntityListOptions
) => {
	const { entityList, params } = useDynamicEntityList(entitySlug, entityType, options)
	return { entityList, params }
}

export const getDynamicEntityProps = (
	entityId: number,
	entityType: EntityType,
	options: GetDynamicEntityPropsOptions
) => {
	const { entityProps, params } = useDynamicEntityProps(entityId, entityType, options)
	return { entityProps, params }
}

export const DynamicEntityList = ({
	options,
	...props
}: {
	entitySlug: string
	entityType: EntityType
	options: GetDynamicEntityListOptions
	Render: (props: unknown) => JSX.Element
}) => <DynamicEntityListClient options={options} {...props} />

export const DynamicEntity = ({
	options,
	...props
}: {
	entityId: number
	entityType: EntityType
	options: GetDynamicEntityPropsOptions
	Render: (props: unknown) => JSX.Element
}) => <DynamicEntityClient options={options} {...props} />
