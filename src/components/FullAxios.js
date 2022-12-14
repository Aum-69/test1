import axios from 'axios';
import NotFound from '../pages/NotFound';
import Cookie from './Cookie';

const baseURL = '/api/';
const baseURL2 = 'http://localhost:8000/api/';

// A Function to call get or post data using axios instance
// parameters required are
// url: the url the request is supposed to be sent to
// type: the type of request (by default get)
// data: if the request is post then whatever data is going to be sent with it
// sendcookie: a parameter to be made true if cookies are supposed to be sent

const fullaxios = (object) => {
	let url = object.url
	let type = object.type
	let data = object.data
	let sendcookie = object.sendcookie
	let formdata = object.formdata
	let infinitloopstopper = 0;
	if (url === undefined) return;
	if (type === undefined || (type !== "get" && type !== "post" && type !== "patch" && type !== "delete")) type = "get";
	if (data === undefined) data = null;
	if (sendcookie === undefined)sendcookie = true;
	if (formdata === undefined)formdata = false;

	// if (url === null){
	// 	return "URL MUST BE GIVEN";
	// }
	// if (type !== "get" && type !== "post" ){
	// 	return "only get or post requests are allowed"
	// }
	// if (type === "post" && data === null){
	// 	return "send data to post"
	// }
	// export function SendCookie({ value = null, setSendCookies = setSendcookietemp, sendCookies = sendcookietemp }) {
	// 	console.log(sendCookies)
	// 	console.log(setSendCookies)
	// 	sendcookietemp = sendCookies
	// 	setSendcookietemp = setSendCookies
	// 	if (value === 1) {
	// 		setSendCookies(true);
	// 		return;
	// 	}
	// 	else if (value === 2) {
	// 		setSendCookies(false);
	// 		return;
	// 	}
	// 	else if (value === "statusCookie") {
	// 		return sendCookies;
	// 	}
	// 	return;

	// }

	const axiosInstance = axios.create({
		baseURL: sendcookie ? baseURL : baseURL2,
		timeout: 30000,
		headers: {
			Authorization: Cookie('getCookie', 'accesstoken')
				? Cookie('getCookie', 'accesstoken')
				: null
			,
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'X-CSRFToken': Cookie('getCookie', 'csrftoken')
            						? Cookie('getCookie', 'csrftoken')
            						: null
		}
		// , 
		// proxy:{
		//     host : 'localhost',
		//     port : 8000
		// }
	});

	axiosInstance.interceptors.response.use(
		(response) => {
			console.log("here af")
			return response;
		},
		async function (error) {
			console.log("here")
			const originalRequest = error.config;
			console.log(error.config)

			if (typeof error.response === 'undefined') {
				// alert(
				// 	'A server/network error occurred. ' +
				// 	'Looks like CORS might be the problem. ' +
				// 	'Sorry about this - we will get it fixed shortly.'
				// );
				return Promise.reject(error);
				return(
					<NotFound /> 
					)
			}
			console.log(originalRequest.url,"line 94")
			console.log(error.response.status,"line 95")
			if (
				error.response.status === 403 &&
				originalRequest.url === 'auth/newaccess'
			) {
				// window.location.href = '/login/';
				return Promise.reject(error);
			}

			if (
				// error.response.data.code === 'token_not_valid' &&
				error.response.status === 403 
				&&
				infinitloopstopper < 10
				// && error.response.statusText === 'Unauthorized'
			) {
				infinitloopstopper ++;
				console.log(error)
				// const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				// const now = Math.ceil(Date.now() / 1000);
				// console.log(tokenParts.exp);
				console.log("goddamit")
				// if (tokenParts.exp > now) {
				sendcookie = true;
				// console.log (sendcookie)
				// Cookie('setCookie', 'accesstoken', null)
				// const axiosInstance1 = axios.create({
				// 	baseURL: baseURL,
				// 	timeout: 10000,
				// 	headers: {
				// 		Authorization: null,
				// 		'Content-Type': 'application/json',
				// 		'Accept': 'application/json'
				// 	}
				// 	// , 
				// 	// proxy:{
				// 	//     host : 'localhost',
				// 	//     port : 8000
				// 	// }
				// });
				console.log("axios instance")
				return axiosInstance
					.get('auth/newaccess',{baseURL: baseURL,headers : {Authorization : null}})
					.then((response) => {
						console.log(response.data.accesstoken,"line 140")
						console.log(Cookie('getCookie', 'accesstoken'))
						Cookie('setCookie', 'accesstoken', response.data.accesstoken);
						// localStorage.setItem('refresh_token', response.data.refresh);
						console.log("i was in here")
						console.log(Cookie('getCookie', 'accesstoken'))
						// axiosInstance.defaults.headers['Authorization'] = Cookie('getCookie', 'accesstoken')
						// axiosInstance.headers['Authorization'] = Cookie('getCookie', 'accesstoken')
						originalRequest.headers['Authorization'] = Cookie('getCookie', 'accesstoken')
						// originalRequest.headers['Authorization'] =response.data.accesstoken;
						
						return axiosInstance(originalRequest);
					})
					.catch((err) => {
						console.log(err);
					});
				}
				
				// specific error handling done elsewhere
				return Promise.reject(error);
			}
			);
			if (type === "get") {
				return axiosInstance.get(url)
	}
	else if (type === "post") {
		// console.log(data)
		// console.log(...data)
		if (formdata === true){
			return axiosInstance.post(url, data, {baseURL: baseURL})
		}
		else{
			return axiosInstance.post(url, { ...data }, {baseURL: baseURL})
		}
	}
	else if (type === "patch"){
		if (formdata === true){
			return axiosInstance.patch(url, data, {baseURL: baseURL})
		}
		else{
			// axiosInstance.headers['Authorization'] = Cookie('getCookie', 'accesstoken')
			
			return axiosInstance.patch(url, { ...data }, {baseURL: baseURL})
		}
	}
	else if (type === "delete"){
		return axiosInstance.delete(url, {baseURL : baseURL})
	}
}

export default fullaxios;