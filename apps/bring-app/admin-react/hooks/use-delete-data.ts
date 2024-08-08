import {useState} from "react";

type Data = {
	id: string;
};

export const useDeleteData = () => {
	const [isPending, setIsPending] = useState(false);
	const [json, setJson] = useState<Data>();

	const submit = async (id: string) => {
		setIsPending(true);
		const response = await fetch("/wp-json/bring/posts/delete", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({id: id.toString()}),
		});
		const json = await response.json();
		setJson(json);
		setIsPending(false);
	};

	return {
		isPending,
		response: json,
		submit,
	};
};
