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
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res=>res.json())
    .then(data=>{
      if(this.txtSearchInput.value){
        this.setState({
          friendsList: data.filter(
            el=> el.name.toLowerCase().indexOf(this.txtSearchInput.value.toLowerCase())> -1)
        });
      }else{
        this.txtSearchInput.value = "Please insert a Name";
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




