import axios from 'axios';
import baseUrl from '../../../utils/baseUrl';

const api = axios.create({
    baseURL: baseUrl
});

export default api;