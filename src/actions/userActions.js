import axios from 'axios';

export function fetchContactList(){
		return function(dispatch){
			axios.get('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				dispatch({type:'FETCH_USER_DONE',payload:response.data});
				
			})
			.catch((err) =>{
				dispatch({type:'FETCH_USER_WITHERROR',payload:err})
			})

		}


}