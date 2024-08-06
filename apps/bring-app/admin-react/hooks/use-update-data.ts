import {useState} from "react";

type Data = {
	id: string;
	title: string;
	description: string;
};

export const useUpdateData = ({
	defaultDescription,
	defaultTitle,
}: {
	defaultTitle: string;
	defaultDescription: string;
}) => {
	const [title, setTitle] = useState(defaultTitle);
	const [description, setDescription] = useState(defaultDescription);
	const [isPending, setIsPending] = useState(false);
	const [json, setJson] = useState<Data>();

	const submit = async (id: string) => {
		setIsPending(true);
		const response = await fetch("/wp-json/bring/posts/update", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({title, description, id}),
		});
		const json = await response.json();
		setJson(json);
		setIsPending(false);
	};

	return {
		title,
		setTitle,
		description,
		setDescription,
		isPending,
		response: json,
		submit,
	};
};
