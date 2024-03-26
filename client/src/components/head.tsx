import React from "react";
import parse from "html-react-parser";
import {getEntity} from "../content";

export type HeadProps = {
	children?: React.ReactNode;
	slug: string | string[] | null;
};

function makeHead<EP = {}>(wpURL: string, dataToken: string) {
	const Head = async ({children, slug}: HeadProps) => {
		const entity = slug ? await getEntity<EP>(wpURL, dataToken, slug) : null;
		return (
			<head>
				{children}
				{entity?.content.head && parse(entity.content.head)}
			</head>
		);
	};

	return Head;
}

export default makeHead;
