import axios from 'axios';

export function getList(query) {
    return axios.get(`http://localhost:8000/locations?q=${query}`)
}
