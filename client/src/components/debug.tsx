import React from "react";
import type {FC} from "react";

const Debug: FC<any> = ({value, ...props}) => (
	<pre {...props}>{JSON.stringify(value, null, 2)}</pre>
);

export default Debug;
