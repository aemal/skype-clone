import axios from "axios";

export function fetchContactList() {
  return function(dispatch) {
    axios
      .get("http://localhost:3001/user/get_friends/5a7303259e0d342e08b32b68") // muss be passed the token object
      .then(response => {
        dispatch({ type: "FETCH_USER_DONE", payload: response.data });
      })
      .catch(err => {
        dispatch({ type: "FETCH_USER_WITHERROR", payload: err });
      });
  };
}
