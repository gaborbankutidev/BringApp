import {useBringContext} from "../context";

export const useNavigate = () => {
	const {navigate} = useBringContext();
	return navigate;
};
