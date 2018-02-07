import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemText } from "material-ui/List";
import SkypeAvatar from "./skypeAvatar";
import SearchList from "../components/searchList";
import decode from 'jwt-decode';
const styles = theme => ({
  root: {
    width: "100%"
  }
});

class ContactList extends Component {
  constructor(){
    super()
    this.state={
      socketChanelId:''
    }
  }
  socketChanel(friendId){
   let user = decode(localStorage.getItem('token')) ;
   let userId = user._id;
   let socketChanelId = userId+friendId
   console.log(socketChanelId)
   this.setState({
    socketChanelId:socketChanelId
   })
   this.props.getId(socketChanelId)

  }
  render() {
    const { classes } = this.props;
    const listItems = this.props.friendsList.map(item => {
      console.log(item);
      return (
        <ListItem key={item.userId}
          dense button className="list-item"
           onClick={() => this.socketChanel(item.userId) }>
          <SkypeAvatar
            avatar={
              // the image will be item.avatarURL
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYezaoFgT-pfb5wpqDXxzKXzhQnTLPU5JW5eUvBaKL1H8Rtmu"
            }
            size={45}
          />
          <ListItemText primary={item.fullName} />
        </ListItem>
      );
    });

    return (
      <div id="friend-list" className={classes.root}>
        <List>{listItems}</List>
      </div>
    );
  }
}

export default withStyles(styles)(ContactList);