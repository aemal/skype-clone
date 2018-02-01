import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import SearchList from '../components/searchList'




class AddContact extends Component {

  constructor() {
    super();
    this.state = {
      friendsList:[],
    }
    this.btnSearchClicked = this.btnSearchClicked.bind(this)
  }

  btnSearchClicked() {
    let searchValue = this.txtSearchInput.value;
    fetch(`http://user/contacts/search/:${searchValue}`)
    .then(res=>res.json())
    .then(data=>{
      if(searchValue){
        this.setState({
          friendsList: data.filter(
            el=> el.name.toLowerCase().indexOf(searchValue.toLowerCase())> -1)
        });
      }else{
        searchValue = "Please insert a Name";
      }
    })
    .catch(err=>console.log(err));
  }

  render() {

    return (
      <div>
          <Input
            inputRef={(thisInput) => {this.txtSearchInput = thisInput}}
          /><br />
          <IconButton
            style={{position:'absolute', top:70, right:2, backgroundColor: '#726F6F'}}
            aria-label="Menu" onClick={this.btnSearchClicked}>
            <i className="material-icons">search</i>
          </IconButton>
          <SearchList friendsList={this.state.friendsList}/>
      </div>
    );
  }
}

export default AddContact;




