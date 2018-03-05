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
        console.log("POST REQUEST");
		const requestUrl = `${DEFAULT_URL}${url}`;

		axios.post(requestUrl, data)
			.then(response => succesHandler(response))
			.catch(error => errorHandler(error));
    }
    
    putRequest(url, data, succesHandler, errorHandler) {
        console.log("PUT REQUEST");
		const requestUrl = `${DEFAULT_URL}${url}`;

		axios.put(requestUrl, data)
			.then(response => succesHandler(response))
			.catch(error => errorHandler(error));
	}
}

export const communicationService = new CommunicationService();