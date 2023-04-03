import {useContext} from "react";
import {EntityProps, SiteProps} from "../types";
import {BringContext} from "../context/bring-context";

export function initStaticHooks<
	SP extends {[key: string]: any},
	EP extends {[key: string]: any},
>() {
	const useSiteProps = () => {
		const {siteProps} = useContext(BringContext);
		return siteProps as SiteProps<SP>;
	};

	const useEntityProps = () => {
		const {entityProps} = useContext(BringContext);
		return entityProps as EntityProps<EP>;
	};

	return {useSiteProps, useEntityProps};
}
