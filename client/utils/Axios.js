import axios from "axios";

//axios.interceptors.request.use(())

const getHeader = () => ({
	csrf: "token",
	Authorization: `Bearer ${localStorage.getItem("access_token")}`
});

const AxiosCall = async (method, url, data, isDownload = false) => {
	return await new Promise(function(resolve, error) {
		axios({
			method: method,
			url: url,
			responseType: isDownload ? "blob" : "json",
			data: data,
			headers: getHeader()
		})
			.then(response => {
				if (response.status === 200) {
					const result = response.data;
					if (isDownload) {
						resolve({ result: response });
					}

					resolve({ result });
				}

				error({ error: { status: response.status } });
			})
			.catch(err => {
				error({ error: err });
			});
	});
};

class Axios {
	constructor() {
		let service = axios.create({
			headers: {
				csrf: "token",
				Authorization: `Bearer ${localStorage.getItem("access_token")}`
			}
		});
		// service.interceptors.response.use(this.handleSuccess, this.handleError);
		this.service = service;
	}

	handleSuccess = response => {
		return response;
	};

	handleError = error => {
		console.log("Error occured in service:", error);

		// switch (error.status) {
		// 	// 	// case 401:
		// 	// 	// 	this.redirectTo(document, "/");
		// 	// 	// 	break;
		// 	// 	// case 404:
		// 	// 	// 	this.redirectTo(document, "/404");
		// 	// 	// 	break;
		// 	// case 500:
		// 	// case 501:
		// 	// case 502:
		// 	// case 503:
		// 	// case 504:
		// 	// 	this.redirectTo(document, "/500");
		// 	// 	break;
		// 	default:
		// 		break;
		// }
		return Promise.reject(error);
	};

	redirectTo = (document, path) => {
		document.location = path;
	};

	get = async path => {
		return await AxiosCall("GET", path);
	};

	get_NotUse(path, successCallback, errorCallback) {
		return (
			this.service
				.request({
					method: "GET",
					url: path,
					responseType: "json",
					headers: this.getHeader()
				})
				//.get(path)
				.then(response => successCallback(response.status, response.data))
				.catch(error => errorCallback(error.response))
		);
	}

	patch(path, payload, callback) {
		return this.service
			.request({
				method: "PATCH",
				url: path,
				responseType: "json",
				data: payload,
				headers: {
					csrf: "token",
					Authorization: `Bearer ${localStorage.getItem("access_token")}`
				}
			})
			.then(response => callback(response.status, response.data));
	}

	post_notUse(path, payload, successCallback, errorCallback) {
		// console.log("accessToken", localStorage.getItem("accessToken"));
		return this.service
			.request({
				method: "POST",
				url: path,
				responseType: "json",
				data: payload,
				headers: {
					csrf: "token",
					Authorization: `Bearer ${localStorage.getItem("access_token")}`
				}
			})
			.then(response => successCallback(response.status, response.data))
			.catch(error => errorCallback(error.response));
	}

	post = async (path, payload) => {
		return await AxiosCall("POST", path, payload);
	};

	postDownload = async (path, payload) => {
		return await AxiosCall("POST", path, payload, true);
	};
}

export default new Axios();
