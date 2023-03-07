import axios, { AxiosInstance } from 'axios';
import { getAccessToken } from 'context/auth/store';

const baseURL = 'http://todoapplication-env.eba-4cbwcdrs.us-east-2.elasticbeanstalk.com/';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
    },
});
