import axios from 'axios';


export function loginRequest(url,email,pass){
    axios.post(url, { emailAddress: email, password: pass })
    .then(function(response){
    console.log(response +'submit succesfull')
  }); 

} 