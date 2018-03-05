import axios from 'axios';

class CommunicationService {
	getRequest(url, succesHandler, errorHandler) {
		const requestUrl = `http://localhost:9000${url}`;

		axios.get(requestUrl)
			.then(response => succesHandler(response))
			.catch(error => errorHandler(error));
	}
}

export const communicationService = new CommunicationService();