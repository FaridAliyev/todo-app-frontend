import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://todoapp-env.eba-wxw2jxbz.us-east-2.elasticbeanstalk.com/';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
