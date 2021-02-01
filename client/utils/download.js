export const DownloadResponse = (res, payload) => {
	const type = payload?.exportRequest?.exportType;

	let filename = res.headers["content-disposition"]?.split("filename=")[1];
	filename = filename?.split(";")[0];

	const downloadUrl = window.URL.createObjectURL(
		new Blob([res.data], { type: "application/octet-stream" })
	);

	const link = document.createElement("a");

	link.href = downloadUrl;

	link.download = filename || `__unNamed.${type}`;

	document.body.appendChild(link);

	link.click();

	link.remove();
};
