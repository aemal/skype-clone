import axios from 'axios';

export function signup(datauser) {
    return dispatch => {
        return axios({ 
            method:'post',
            url:'http://localhost:3001/auth/signup',
            data:JSON.stringify(datauser),
            withCredentials: true,
            headers: {
                ' Access-Control-Allow-Credentials': true,
                'content-type': 'application/x-www-form-urlencoded'
                
              }       
     })
    }
}


