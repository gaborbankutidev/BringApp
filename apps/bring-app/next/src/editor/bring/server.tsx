/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import {
	type EntityType,
	type GetDynamicEntityListOptions,
	type GetDynamicEntityPropsOptions,
} from "@bring/blocks-client";
import {
	DynamicEntity as DynamicEntityClient,
	DynamicEntityList as DynamicEntityListClient,
	useDynamicEntityList,
	useDynamicEntityProps,
} from "./client";

import type {JSX} from "react";

export const getDynamicEntityList = (
	entitySlug: string,
	entityType: EntityType,
	options: GetDynamicEntityListOptions,
) => {
	const {entityList, params} = useDynamicEntityList(
		entitySlug,
		entityType,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		options,
	);
	return {entityList, params};
};

export const getDynamicEntityProps = (
	entityId: number,
	entityType: EntityType,
	options: GetDynamicEntityPropsOptions,
) => {
	const {entityProps, params} = useDynamicEntityProps(
		entityId,
		entityType,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		options,
	);
	return {entityProps, params};
};

export const DynamicEntityList = ({
	options,
	...props
}: {
	entitySlug: string;
	entityType: EntityType;
	options: GetDynamicEntityListOptions;
	Render: (props: any) => JSX.Element;
}) => <DynamicEntityListClient options={options} {...props} />;

export const DynamicEntity = ({
	options,
	...props
}: {
	entityId: number;
	entityType: EntityType;
	options: GetDynamicEntityPropsOptions;
	Render: (props: any) => JSX.Element;
}) => <DynamicEntityClient options={options} {...props} />;
