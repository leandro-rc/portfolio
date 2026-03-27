import ky from 'ky';

// const prefixUrl = 'https://swapi.dev/api';
const prefixUrl = 'http://localhost:5000/api';

const client = ky.extend({
    prefixUrl,
    timeout: 10000, // 10 seconds timeout
    hooks: {
        beforeRequest: [
            (request) => {
                // Do something before every request
                // This is a good place to authorize request if needed
            },
        ],
        afterResponse: [
            (response) => {
                // Do something after every response
                // For example, check status code etc...
            },
        ],
        beforeError: [
            (error) => {
                console.error('[ky] Network or HTTP error:', error);
                return error;
            },
        ],
    },
});

export default client;
