import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemText } from "material-ui/List";
import SkypeAvatar from "./skypeAvatar";
//import SearchList from "../components/searchList";
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
    this.state = {
      socketChanelId: '',
      selectedIndex: null,
    }
  }

  socketChanel(friend, e, i){
    

    this.setState({ selectedIndex: i });

    let user = decode(localStorage.getItem('token')) ;
    //let userId = user._id;
    //let socketChanelId = userId+"--"+friend.userId;

    //AJAX call 
    let url = `${config.BASE_URL}user/message/get`;

    const postData = {
      userID: user._id,
      friendID: friend.userId
    };
    
    if (postData) {
      const parsedFields = Object.keys(postData)
        .map(key => {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(postData[key])
          );
        })
        .join("&");

      fetch(url, {
        method: "POST",
        headers: {
          'Authorization': `TOKEN ${localStorage.getItem('token')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: parsedFields
      })
        .then(res => res.json())
        .then((data) => {
          console.log("ChatID Response: ", data);
          let chatInfo;

          if(data.messages !== undefined) { //old messages exists, should load them
            chatInfo = {
              chatID: data.chat._id,     
              messages: data.messages 
            };
          } else { //no old messages to load
            chatInfo = {
              chatID: data._id,     
              messages: []
            };
          }

        console.log(chatInfo);

        this.setState({
          socketChanelId: chatInfo.chatID
         })
    
    
         this.props.getId(chatInfo)
        })
        .catch(err => console.log(err));
    } else {
      console.log({ Error: "Fields are required" }); //Handle errors here...
    }

    
     
    this.props.setCurrentFriend(friend);

    // console.log(friend);


  
   //console.log(socketChanelId)
   
 

  }
  
  render() {
    const { classes } = this.props;

    const listItems = this.props.friendsList.map((item, index) => {
      

      let avatarURL = item.avatarURL !== '' ? `${config.BASE_URL}images/avatars/${item.avatarURL}` : `${config.BASE_URL}images/avatar_placeholder.png`;

      let highlightedFriend = (index === this.state.selectedIndex) ? "#01062e" : "";

      return (
        <ListItem key={item.userId}
          dense button className="list-item"
          style={{ backgroundColor: highlightedFriend }}
          onClick={event => this.socketChanel(item, event, index)} >
          <SkypeAvatar
            avatar={avatarURL}
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