export const isInternalServerError = apis => {
	const failedApis = apis.filter(api => api.error);
	return failedApis.length >= apis.length - 1;
};
