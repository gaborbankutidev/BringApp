import {ResponsiveValue} from "../client-types";
import {DashIcon} from "./dashicon.types";

type DisplayValue =
	| "block"
	| "inline-block"
	| "inline"
	| "flex"
	| "inline-flex"
	| "table"
	| "inline-table"
	| "table-caption"
	| "table-cell"
	| "table-column"
	| "table-column-group"
	| "table-footer-group"
	| "table-header-group"
	| "table-row-group"
	| "table-row"
	| "flow-root"
	| "grid"
	| "inline-grid"
	| "contents"
	| "list-item";

type ResponsiveDisplayValueConfig = {
	"": DisplayValue;
	md: DisplayValue;
	lg: DisplayValue;
};

// ===========

export type Sides = {
	t?: ResponsiveValue;
	b?: ResponsiveValue;
	l?: ResponsiveValue;
	r?: ResponsiveValue;
};

// ===========

export type BlockStylesConfig = {
	spacing?: {
		m?: Sides;
		p?: Sides;
	};
	visibility?: ResponsiveDisplayValueConfig;
};

export type BlockStyles = {
	spacing?: {
		m?: Sides;
		p?: Sides;
	};
	visibility?: ResponsiveValue<boolean>;
};

// ===========

type ResponsiveLabel = {
	label: string;
	icon: DashIcon;
};

export type ResponsiveLabels = {
	"": ResponsiveLabel;
	md: ResponsiveLabel;
	lg: ResponsiveLabel;
};
