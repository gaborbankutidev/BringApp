export const validatePhoneNumber = (value: string) =>
	value.length < 20 &&
	/^([+]?[0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[0-9])+$/.test(value);
