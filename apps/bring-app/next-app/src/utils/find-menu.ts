import type { MenuLocationType, MenuType } from "@bring/blocks-client"

export const findMenu = (
	menuLocations: MenuLocationType[],
	menus: MenuType[],
	locationKey: string
) => {
	// find menu location by key
	if (!menuLocations) return

	const menuLocation = menuLocations.find((menuLocation) => menuLocation.key === locationKey)

	if (!menuLocation) return []

	// find menu based on the id in location
	const menu = menus.find((menu) => menu.id === menuLocation.menuId)
	if (!menu) return []

	return menu.items
}
