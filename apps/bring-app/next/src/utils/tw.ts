import {extendTailwindMerge, twJoin} from "tailwind-merge";

// extend twMerge
type AdditionalClassGroupIds = "heading";
const fontSizeClassGroupCheck = (classPart: string) =>
	/^[1-9][0-9]*[a-z]*$/.test(classPart);
export const twMerge = extendTailwindMerge<AdditionalClassGroupIds>({
	extend: {
		classGroups: {
			heading: ["h1", "h2", "h3", "h4", "h5", "h6"],
			"font-size": [{text: [fontSizeClassGroupCheck]}],
		},
	},
});

export {twJoin};
