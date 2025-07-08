/**
 * Container sizes
 * Generally used in the project for top level components (Section, etc.) for consistent spacing.
 *
 * @param containerSizes - the container sizes
 * @param containerSizeList - the list of container sizes
 * @param ContainerSizeType - the type of the container size
 */
export const containerSizes = {
	"720": "w-full px-4 md:px-8 max-w-[784px] min-[784px]:mx-auto",
	"1040": "w-full px-4 md:px-8 lg:px-10 max-w-[1080px] min-[1080px]:mx-auto",
	"1200": "w-full px-4 md:px-8 lg:px-10 max-w-[1280px] min-[1280px]:mx-auto",
	"1520": "w-full px-4 md:px-8 lg:px-10 max-w-[1600px] min-[1600px]:mx-auto",
	wide: "w-full px-4 md:px-8 lg:px-10", // Without max width
	full: "w-full px-0", // Without max width and margin
	split: "w-full px-4 md:pl-8 md:pr-0 lg:pl-10 md:max-w-[66%] lg:max-w-[50%]", // splits the content for the purple radial background
} as const

/**
 * Container size list
 *
 * This can be used in storybook as arg type or as select control options in the wp config.
 */
export const containerSizeList = Object.keys(containerSizes)

/**
 * Container size type
 */
export type ContainerSizeType = keyof typeof containerSizes
