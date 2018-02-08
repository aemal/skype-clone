import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import Input from "material-ui/Input";
import SearchList from "../components/searchList";

class AddContact extends Component {
  constructor() {
    super();
    this.state = {
      users: '',
    };
    this.btnSearchClicked = this.btnSearchClicked.bind(this);
  }

  btnSearchClicked() {
    let token = localStorage.getItem("token");
    let searchValue = this.txtSearchInput.value;
    fetch(`http://localhost:3001/user/contacts/search/${searchValue}`,{headers: {Authorization: `TOKEN ${token}` }} )
      .then(res => res.json())
      .then((data) => {
                      if (searchValue) {
                        this.setState({users: data });
                      } else {
                        searchValue = "Please insert a Name";
                      }                      })
      .catch(err => console.log(err));
}
  render() {
    return (
      <div>
        <Input
          onKeyDown={(e)=>{
            if(e.keyCode === 13){
              this.btnSearchClicked()
                }
              }
            }
          inputRef={thisInput => {
            this.txtSearchInput = thisInput;
          }}
          style={{width:"80%"}}
        />
        <IconButton
          style={{
            position: "absolute",
            top: 20,
            right: 70,
            backgroundColor: "#726F6F"
          }}
          aria-label="Menu"
          onClick={this.btnSearchClicked}
        >
          <i className="material-icons">search</i>
        </IconButton>
        <SearchList users={this.state.users} />
      </div>
    );
  }
}

export default AddContact;