import axios from "axios";

/* Manages axios and tokens requests */

//const baseURL = "https://localhost/api/";
const baseURL = "http://127.0.0.1:8000/api/";

const api = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
        	? 'JWT ' + localStorage.getItem('access_token')
        	: null,
        //'Content-Type': 'multipart/form-data',
        "Content-Type": "application/json",

        //accept: 'application/json',
        //accept: '*/*',
    },
});

// Función para realizar una solicitud GET
export const getData = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error in GET request:", error);
        throw error;
    }
};

// Función para realizar una solicitud POST
export const postData = async (endpoint, data) => {
    try {
        const response = await api.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error;
    }
};

// Función para realizar una solicitud PUT
export const putData = async (endpoint, data) => {
    try {
        await api.put(endpoint, data);
    } catch (error) {
        console.error("Error in PUT request:", error);
        throw error;
    }
};

export const patchData = async (endpoint, data) => {
    try {
        await api.patch(endpoint, data);
    } catch (error) {
        console.error("Error in PATCH request:", error);
        throw error;
    }
};

export const deleteData = async (endpoint) => {
    try {
        await api.delete(endpoint);
    } catch (error) {
        console.error("Error in DELETE request:", error);
        throw error;
    }
};

/*The following code is to request a new access token when it has expired, using the refresh 
token.*/

/* This interceptor is executed every time a response is received after making a request 
with 'api'.*/
api.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}
        /* If there is an error after an HTTP request, and expiration date of access token 
        has passed, take the refresh token, if expiration date of refresh token 
        has not passed, it is sent to '/token/refresh/' to request a new access 
        and refresh tokens*/
		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');
			if (refreshToken) {
				//atob decodes a base64-encoded string
				//Decode information from the payload into an object, some metadata as exp time
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
				// exp date in token is expressed in seconds, while now() returns milliseconds
				// Round up Date.now
				const now = Math.ceil(Date.now() / 1000);

				if (tokenParts.exp > now) {
					return api
						.post('/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							api.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return api(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					//Redirecting
					window.location.href = '/login/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/login/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default api;
