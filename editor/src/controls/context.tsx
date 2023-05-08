import React, {useContext} from "react";
import type {FC} from "react";

const ControlContext = React.createContext<{
	attributes: any;
	setAttributes: any;
}>({
	attributes: {},
	setAttributes: () => {},
});

export const ControlContextProvider: FC<{
	attributes: any;
	setAttributes: any;
	children: React.ReactNode;
}> = ({attributes, setAttributes, children}) => (
	<ControlContext.Provider
		value={{
			attributes,
			setAttributes,
		}}
	>
		{children}
	</ControlContext.Provider>
);

export const useControlContext = () => {
	return useContext(ControlContext);
};
