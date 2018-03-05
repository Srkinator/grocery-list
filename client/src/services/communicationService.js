import axios from 'axios';

const DEFAULT_URL = "http://localhost:9000";

class CommunicationService {
	getRequest(url, succesHandler, errorHandler) {
		const requestUrl = `${DEFAULT_URL}${url}`;

		axios.get(requestUrl)
			.then(response => succesHandler(response))
			.catch(error => errorHandler(error));
	}
	postRequest(url, data, succesHandler, errorHandler) {
		const requestUrl = `${DEFAULT_URL}${url}`;

		axios.post(requestUrl, data)
			.then(response => succesHandler(response))
			.catch(error => errorHandler(error));
	}
}

export const communicationService = new CommunicationService();