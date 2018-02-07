import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import SkypeAvatar from './skypeAvatar';
import IconButton from "material-ui/IconButton";
import uuidv1 from "uuid/v1";

const styles = theme => ({
  root: {
    width: '100%',
  },
});

class SearchList extends Component {
    constructor() {
      super();
      this.requestFriends = this.requestFriends.bind(this);
    }

    requestFriends(user) {
    let token = localStorage.getItem("token");
    let url = `http://localhost:3001/user/friend/add/${uuidv1()}`;
    let formData = {
      fullName: user.profile.firstName + ' ' + user.profile.lastName,
      avatarURL: user.profile.avatarURL,
      userId: user._id
    }
    if (user) {
    const searchParams = Object.keys(formData)
      .map(key => {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
        );
    })
    .join("&");

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `TOKEN ${token}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: searchParams
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data );
      })
      .catch(err => console.log(err));
    } else {
      console.log({ Error: "Fields are required" }); //Handle errors here...
    }
  }
  render() {
    const { classes } = this.props;
    let listItems = "Search a new friend";
    if(this.props.users !== ''){
     listItems = this.props.users.map(item => {
      return (
        <ListItem key={item._id} dense button className="list-item">
          <SkypeAvatar
            avatar={
              // the image will be item.avatarURL
                `images/avatar/${item.profile.avatarURL}`
            }
            size={45}
          />
          <ListItemText primary={item.profile.firstName + ' ' + item.profile.lastName} />
        <IconButton onClick={()=>
          this.requestFriends(item)
        }>
          <i className="material-icons">add_circle_outline</i>
        </IconButton>
        </ListItem>
      );
    });
  }
    return (
      <div id="friend-list" className={classes.root}>
        <List>{listItems}</List>
      </div>
    );
  }
}


export default withStyles(styles)(SearchList);