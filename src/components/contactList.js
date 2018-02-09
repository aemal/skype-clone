import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemText } from "material-ui/List";
import SkypeAvatar from "./skypeAvatar";
import SearchList from "../components/searchList";
import decode from 'jwt-decode';
import config from '../config/config';
import { setCurrentFriend } from "../actions/setCurrentFriendAction";
import compose from 'recompose/compose';
import { connect } from "react-redux";


const styles = theme => ({
  root: {
    width: "100%"
  }
});

class ContactList extends Component {
  
  constructor() {
    super();
    this.state={
      socketChanelId:''
    }
  }

  socketChanel(friend){
    
    this.props.setCurrentFriend(friend);

    console.log(friend);

   let user = decode(localStorage.getItem('token')) ;
   let userId = user._id;
   let socketChanelId = userId+"--"+friend.userId;
   //console.log(socketChanelId)
   
   this.setState({
    socketChanelId: socketChanelId
   })

   console.log("AAAAAA", socketChanelId);

    this.props.getId(socketChanelId)

  }
  render() {
    const { classes } = this.props;
    const listItems = this.props.friendsList.map(item => {
      
      let avatarURL = item.avatarURL !== '' ? `${config.BASE_URL}images/avatars/${item.avatarURL}` : `${config.BASE_URL}images/avatar_placeholder.png`;
console.log(avatarURL)
      //console.log(item);
      return (
        <ListItem key={item.userId}
          dense button className="list-item"
           onClick={() => this.socketChanel(item) }>
          <SkypeAvatar
            avatar={avatarURL}
            size={45}
          />
          <ListItemText primary={item.fullName}  />
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

const mapDispatchToProps = (dispatch) => {
  return {
      setCurrentFriend: (user) => {
          dispatch(setCurrentFriend(user));
      }
  };
};


export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(ContactList);