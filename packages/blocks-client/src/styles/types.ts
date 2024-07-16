export type ResponsiveValue<T = number> = {
	""?: T;
	md?: T;
	lg?: T;
};

export type BringStylesClassNames = {
	spacing?: {
		m?: string;
		p?: string;
	};
	visibility?: string;
	classNames?: string;
};
