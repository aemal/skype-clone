import axios from 'axios';

export function login(data) {
    return dispatch => {
        return axios.post('http://localhost:3001/auth/login',data)
    }
}