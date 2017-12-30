const  contactListFilterReducer = (state,action ) => {
 switch (action.type) {
 	case 'CONTACT_FILTER': 
   return action.payload; 
 	default:
 	return state || '';
   
   }

 }
 //state.contactList.filter(el=> el.name.toLowerCase().match(searchValue.toLowerCase()))
 export default contactListFilterReducer;