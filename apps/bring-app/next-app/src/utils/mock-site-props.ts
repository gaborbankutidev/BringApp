import type { Menu, MenuItem, SiteProps } from "@/bring/types"
import type {
	SiteProps as BringSiteProps,
	MenuLocationType,
	MenuType,
} from "@bring/blocks-client/types"

const menus: MenuType<Menu, MenuItem>[] = [
	{
		id: 1,
		name: "Header Menu Links",
		items: [
			{
				id: 1,
				name: "Home",
				url: "#",
			},
			{
				id: 2,
				name: "Blog",
				url: "#",
			},
			{
				id: 3,
				name: "Services",
				url: "#",
			},
		],
	},
	{
		id: 2,
		name: "Footer Menu",
		items: [
			{
				id: 4,
				name: "Contact",
				url: "#",
			},
			{
				id: 5,
				name: "About Us",
				url: "#",
			},
			{
				id: 6,
				name: "Careers",
				url: "#",
			},
			{
				id: 7,
				name: "Support",
				url: "#",
			},
		],
	},
	{
		id: 3,
		name: "Bottom Menu Links",
		items: [
			{
				id: 8,
				name: "Privacy Policy",
				url: "#",
			},
			{
				id: 9,
				name: "Terms of Service",
				url: "#",
			},
			{
				id: 10,
				name: "Impressum",
				url: "#",
			},
		],
	},
]

const menuLocations: MenuLocationType[] = [
	{
		key: "headerMenu",
		menuId: 1,
	},
	{
		key: "footerMenu",
		menuId: 2,
	},
	{
		key: "bottomMenu",
		menuId: 3,
	},
]

const socialLinks: SiteProps["socialLinks"] = {
	facebook: "https://www.facebook.com/example",
	instagram: "https://www.instagram.com/example",
	linkedin: "https://www.linkedin.com/example",
	github: "https://www.github.com/example",
}

export const mockSiteProps: BringSiteProps<SiteProps, Menu, MenuItem> = {
	menus,
	menuLocations,
	socialLinks,
}
