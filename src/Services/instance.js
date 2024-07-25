import axios from 'axios';

// define the base url for the API
const baseURL = 'http://localhost:8080/api';

// create an axios instance
const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const protectedInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// Interceptor to add the token to requests
protectedInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export {
    instance,
    protectedInstance
}