import type { Menu, MenuItem } from "@/bring/types"
import type { MenuItemType, MenuLocationType, MenuType } from "@bring/blocks-client"

/**
 * Find a menu by location key and return the menu items or an empty array if the menu is not found.
 *
 * @param menuLocations - The menu locations.
 * @param menus - The menus.
 * @param locationKey - The location key.
 * @returns The menu items.
 */
export const findMenu = (
	menuLocations: MenuLocationType[],
	menus: MenuType<Menu, MenuItem>[],
	locationKey: string
): MenuItemType<MenuItem>[] => {
	// find menu location by key
	if (!menuLocations || !menus) return []

	const menuLocation = menuLocations.find((location) => location.key === locationKey)

	if (!menuLocation) return []

	// find menu based on the id in location
	const menu = menus.find((menu) => menu.id === menuLocation.menuId)
	if (!menu) return []

	return menu.items
}
