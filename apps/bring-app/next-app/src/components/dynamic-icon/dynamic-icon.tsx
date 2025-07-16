import { boxIconList, type BoxIconType } from "@/utils/box-icons"
import dynamic from "next/dynamic"
import type { IconBaseProps } from "react-icons"
import { BiCircle } from "react-icons/bi"

type DynamicIconProps = {
	icon?: BoxIconType
} & IconBaseProps

const DynamicIcon = ({ icon, ...props }: DynamicIconProps) => {
	// return null if icon is not provided
	if (!icon) {
		return null
	}

	// return BiCircle as fallback if icon is not in boxIconList
	if (!boxIconList.includes(icon)) {
		return <BiCircle {...props} />
	}

	const Icon = dynamic(async () => await import("react-icons/bi").then((mod) => mod[icon]), {
		loading: () => <BiCircle {...props} />,
	})

	return <Icon {...props} />
}

export default DynamicIcon
