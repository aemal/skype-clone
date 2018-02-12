export default function changeSettingReducer(state={
	currentUserData:{},
	error:null 
	
},action){
	switch(action.type){
		case 'CHANGE_USER_DONE':{
		  return {...state,currentUserData:action.payload}	
		}
		case 'CHANGE_USER_WITHERROR':{
			return {...state,error:action.payload}
		}
    default:
    return state
	}

}