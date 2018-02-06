import axios from "axios";

export function fetchContactList() {
  return function(dispatch) {
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:3001/user/get_friends/aaaa", {
        headers: {
          Authorization: `TOKEN ${token}`
        }
      }) // muss be passed the token object
      .then(response => {
        dispatch({ type: "FETCH_USER_DONE", payload: response.data });
      })
      .catch(err => {
        dispatch({ type: "FETCH_USER_WITHERROR", payload: err });
      });
  };
}
