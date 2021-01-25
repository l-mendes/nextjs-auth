import axios from 'axios';
import baseUrl from '../../../utils/baseUrl'
import api from '../api/api';

export default class AbstractServices 
{
    constructor() {
        this.api = api;
    }

    getData = async (path) => {
        const data = await this.api.get(`/api/${path}`);
        return data.data;
    }
}