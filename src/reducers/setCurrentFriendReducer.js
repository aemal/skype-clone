const  setCurrentFriendReducer = (state={
    setCurrentFriend: '',
    } ,action ) => {
        switch (action.type) {
            case 'SET_CURRENT_FRIEND':
                return action.payload;
            default:
                return state || '';
        }
    }
export default setCurrentFriendReducer;