import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://todolist-env-1.eba-ypgp9uc6.us-east-2.elasticbeanstalk.com/';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
