import qs from 'qs';
const API_BASE_URL = 'http://music.163.com'
const defaultHeaders = {
    'Cookie': 'appver=4.0.2',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Referer': API_BASE_URL,
}
function parseJSONFilter(response) {
    return response.json()
}

function get(uri: string): Promise<any> {
    return fetch(API_BASE_URL + uri, {
        headers: defaultHeaders
    }).then(parseJSONFilter).catch((error) => ({error}));
}

function post(uri: string, body: {}): Promise<any> {
    return fetch(API_BASE_URL + uri, {
        body: qs.stringify(body),
        headers: defaultHeaders,
        method: 'POST'
    }).then(parseJSONFilter).catch((error) => ({error}));
}

export const request = {get, post}