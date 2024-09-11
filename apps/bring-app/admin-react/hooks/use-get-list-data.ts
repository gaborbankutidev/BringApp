import {useEffect, useState} from "react";

type Data = {
	id: string;
	title: string;
	description: string;
}[];

export const useGetListData = () => {
	const [data, setData] = useState<Data | null>(null);
	const [isPending, setIsPending] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/wp-json/bring/posts/list`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				});
				const data = await response.json();
				setData(data);
			} catch (e) {
				setIsError(true);
			}
			setIsPending(false);
		};
		fetchData();
	}, []);

	return {data, isPending, isError};
};
