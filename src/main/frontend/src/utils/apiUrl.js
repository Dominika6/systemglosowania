export function getApiUrl(endpoint) {
    console.log('site', process.env.REACT_APP_API_URL);

    console.log('endpoint', endpoint);
    //return `${process.env.REACT_APP_API_URL}${endpoint}`;
    return "http://localhost:8080";
}

