import {EntityProps, SiteProps} from "../types";
import {useBringContext} from "../context";

export function initStaticHooks<
	SP extends {[key: string]: any},
	EP extends {[key: string]: any},
>() {
	const useSiteProps = () => {
		const {siteProps} = useBringContext();
		return siteProps as SiteProps<SP>;
	};

	const useEntityProps = () => {
		const {entityProps} = useBringContext();
		return entityProps as EntityProps<EP>;
	};

	return {useSiteProps, useEntityProps};
}
