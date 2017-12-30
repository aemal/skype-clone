export default function contactListReducer(state={
	contactList:[],
	fetching:false,
	fetched:false,
	error:null 
	
},action){
	switch(action.type){
		case 'FETCH_CONTACT_LIST':{
			return {...state,fetching:true}
		}
		case 'FETCH_USER_DONE':{
		  return {...state,fetching:false,fetched:true,contactList:action.payload}	
		}
		case 'FETCH_USER_WITHERROR':{
			return {...state,fetching:false,error:action.payload}
		}
    default:
    return state
	}

}