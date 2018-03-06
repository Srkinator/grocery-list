import axios from 'axios';

const DEFAULT_URL = "http://localhost:9000";

class CommunicationService {
	getRequest(url, successHandler, errorHandler) {
		const requestUrl = `${DEFAULT_URL}${url}`;

		axios.get(requestUrl)
			.then(response => successHandler(response))
			.catch(error => errorHandler(error));
    }
    
	postRequest(url, data, successHandler, errorHandler) {
		const requestUrl = `${DEFAULT_URL}${url}`;

		axios.post(requestUrl, data)
			.then(response => successHandler(response))
			.catch(error => errorHandler(error));
    }
    
    putRequest(url, data, successHandler, errorHandler) {
		const requestUrl = `${DEFAULT_URL}${url}`;

		axios.put(requestUrl, data)
			.then(response => successHandler(response))
			.catch(error => errorHandler(error));
    }
    
    deleteRequest(url, successHandler, errorHandler) {
		const requestUrl = `${DEFAULT_URL}${url}`;

		axios.delete(requestUrl)
			.then(response => successHandler(response))
			.catch(error => errorHandler(error));
	}

}

export const communicationService = new CommunicationService();