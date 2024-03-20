import {FCC} from "../types";
import {getEntity, getSiteProps, createBringElement} from "../content";

function makeMain<EP = {}, SP = {}, M = {}, MI = {}, CTX = {}>(
	wpURL: string,
	componentMap: Map<string, FCC<any, EP, SP, M, MI, CTX>>,
) {
	const Main = async ({
		slug = "",
		context,
	}: {
		slug?: string | string[];
		context?: CTX;
	}) => {
		const siteProps = await getSiteProps<SP, M, MI>(wpURL);
		const entity = await getEntity<EP>(wpURL, slug);

		if (
			!entity ||
			!(entity?.responseCode === undefined || entity.responseCode === 200)
		) {
			return null;
		}

		return entity.content.main
			? createBringElement(
					entity.content.main,
					componentMap,
					entity.props,
					siteProps,
					context,
			  )
			: null;
	};

	return Main;
}

export default makeMain;
