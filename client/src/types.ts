import type {FC} from "react";

export type Obj = Record<string, unknown>;
export type Defined<T> = Exclude<T, undefined>;

export type FCC<P = {}> = FC<
	P & {className?: string | undefined; id?: string | undefined}
>;

export type GridNumType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ImageType = {
	src?: string;
	alt?: string;
	id: number | null;
};

export type LinkType = {
	url?: string;
	newTab?: boolean;
};

export type MenuItemType = {
	url?: string;
	name: string;
	target: string;
	children?: MenuItemType[];
};

export type MenuType = {
	id: number;
	name: string;
	items: MenuItemType[];
};

// ===========

export type EntityType = "post" | "taxonomy" | "author";

export type DynamicEntityList<T = {}> = ({id: number} & T)[] | null;
export type DynamicEntityProps<T extends {[key: string]: any} = {}> =
	| ({
			name: string;
			image: ImageType | null;
			excerpt: string | null;
			description: string | null;
			slug: string | null;
			url: string;
	  } & T)
	| null;

export type SiteProps<SP> = {
	logo: string | null;
	url: string;
	menus: MenuType[];
} & SP;

export type EntityContent = {
	header?: BringNode[];
	main: BringNode[];
	footer?: BringNode[];
	layout?: BringNode[];
};

export type EntityProps<EP extends {[key: string]: any} = {}> = {
	entityType: EntityType | null;
	entitySlug: string | null;
	entityId: number;
	name: string | null;
	excerpt: string | null;
	description: string | null;
	image?: ImageType | null;
	url: string | null;
} & EP;

export type BringContextType<
	SP extends {[key: string]: any} = {},
	EP extends {[key: string]: any} = {},
> = {
	siteProps: SiteProps<SP>;

	entityContent: EntityContent;
	setEntityContent: (entityContent: EntityContent) => void;
	entityProps: EntityProps<EP>;
	setEntityProps: (entityProps: EntityProps<EP>) => void;

	componentMap: Map<string, FC<any>>;

	dynamicCache: Map<string, any>;
	contentCache: Map<
		string,
		{
			url: string;
			content?: {
				entityContent: {main: BringNode[]; layout?: BringNode[]};
				entityProps: EntityProps<EP>;
			};
			isLoading?: boolean;
		}
	>;
};

// ===========

export type BringNode = {
	key: string;
	component: string;
	props: {[key: string]: any};
	children?: BringNode[];
};
