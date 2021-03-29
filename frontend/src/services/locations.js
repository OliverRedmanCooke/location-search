import axios from 'axios';
import {environment} from '../config/config'

export function getList(query) {
    return axios.get(`${environment.api}/locations?q=${query}`)
}
