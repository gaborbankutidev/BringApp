import {useEffect, useState} from "react";

type Data = {
	id: string;
	title: string;
	description: string;
};

export const useGetData = ({id}: {id: string}) => {
	const [data, setData] = useState<Data | null>(null);
	const [isPending, setIsPending] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/wp-json/bring/posts/read`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({id}),
				});
				const data = await response.json();
				setData(data);
			} catch (e) {
				setIsError(true);
			}
			setIsPending(false);
		};
		fetchData();
	}, [id]);

	return {data, isPending, isError};
};
