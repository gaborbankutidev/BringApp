// import {notFound, redirect} from "next/navigation";
// import {getEntity} from "./render";

// /**
//  * Extends `getEntity` by handling not-found and redirect responses
//  * @param slug Slug of the entity
//  * @returns The entity, or null if the request fails
//  */
// export const handleGetEntity = async (slug?: string | string[] | undefined) => {
// 	const entity = await getEntity(slug);

// 	if (!entity) return null; // TODO: handle this as an Internal Server Error

// 	if (entity.responseCode === 200) {
// 		return entity;
// 	}

// 	if (entity.responseCode === 404) {
// 		notFound();
// 	}

// 	redirect(entity.redirectTo);
// };
