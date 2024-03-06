import { URL2 } from '../config/constants';


export class GetDataService  {

	static async getData(xAuth, body, url = URL2) {

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth': xAuth,
			},

			body: JSON.stringify(body)
		});
		return await response.json();
	}
}
