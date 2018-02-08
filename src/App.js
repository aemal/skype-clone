import React, { Component } from "react";
import UserAvatar from "./components/UserAvatar";
import ContactList from "./components/contactList";
import ContactDetail from "./components/contactDetail";
import MessagesLog from "./components/messagesLog";
import NewMessage from "./components/newMessage";
import { fetchContactList } from "./actions/userActions";
import io from "socket.io-client";
import moment from "moment";
import { connect } from "react-redux";
import SearchBar from "./container/FriendsSearchBar"; //FIXME: Incompatible with Material UI 1.0 Beta. Use react-autosuggest instead.
import "./App.css";
import "./style.css";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import decode from "jwt-decode";
import config from "./config/config.js";

function mapStateToProps(state, filter) {
  return {
    contactList: state.contactListReducers.contactList.filter(c => {
      return (
        c.fullName
          .toLowerCase()
          .indexOf(state.contactListFilterReducer.toLowerCase()) > -1
      );
      //return c.name.toLowerCase().indexOf(state.contactListFilterReducer.toLowerCase()) > -1
    })
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: "row",
      justify: "flex-start",
      alignItems: "stretch",
      socketId: "",
      socketChanelId:'',
      messages: [],
      moment: moment()
        .startOf("day")
        .fromNow()
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    this.socket = io(config.SOCKET_URL); 
    this.socket.on("connect", socket => this.connect(socket));
  
  }

  componentWillMount() {
    this.props.dispatch(fetchContactList());
  }

  componentDidMount() {
     //this.socket.on("message", message => {
    this.socket.on(this.state.socketChanelId, message => {
      console.log("received messages...")
      this.setState({ messages: [...this.state.messages, message] });
    });
 
   
    this.socket.on('conversation private post', function(data) {
        //display data.message
        console.log(data);
    });

  }

  connect(socket) {
    this.setState({
      socketId: this.socket.id
    });
  }
  
  socketSignal(roomID, Sbody) {
     
    console.log("asdfasdf", roomID)
    const body = Sbody;

    console.log(body);

    let id = this.state.socketId;
    let moment = <p>this.state.moment</p>;
    
    const message = {
      body,
      id,
      socketId: this.state.socketId,
      moment,
      roomID
    };

    console.log("-----------")
    console.log(message)

    this.setState({ messages: [...this.state.messages, message] });
    
    this.socket.emit("privateMessage", message);
    
  }

  getSocketChanelId(roomID) {
    
    this.setState({
      socketChanelId: roomID
    })

    this.socketSignal(roomID, "asdfasdf");

    console.log(roomID)

       
    console.log("roomID", roomID)

    this.socket.emit('joinRoom', {
      roomID,
      participants: [roomID.split("--")[0], roomID.split("--")[1]]
    });


    this.socket.on('joinRoom', function(roomInfo) {
        console.log('joining room', roomInfo.roomID);
        
        let user = decode(localStorage.getItem("token"));

        if(user._id === roomInfo.friendID || user._id === roomInfo.userID) {
          this.socket.join(roomInfo.roomID);
        }
    });


    
  }

  handleSubmit(event) {
   this.socketSignal(this.state.socketChanelId, event.target.value)
   event.target.value = '';


   
  }

  render() {
    const { alignItems, direction, justify } = this.state;

    // Getting the information from the loged user
    let user = decode(localStorage.getItem("token"));

    return (
      <Grid
        container
        alignItems={alignItems}
        direction={direction}
        justify={justify}
        item
        sm={12}
        lg={12}
      >
        <Grid item xs={12} sm={4} lg={3} className="app">
          <Grid>
            <Paper>
              <Grid item sm={12} className="sideBarAvatarComponent">
                <UserAvatar avatarURL={user.avatarURL} />
              </Grid>
              <Grid item sm={12} className="sideBarContactListComponent">
                <ContactList 
                 friendsList={this.props.contactList}
                 getId={this.getSocketChanelId.bind(this)} />
              </Grid>
              <Grid item sm={12}>
                <SearchBar friendsList={this.props.contactList} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} lg={9} className="app">
          <Grid item sm={12} className="messagesContactDetailComponent">
            <ContactDetail />
          </Grid>
          <Grid item sm={12} className="messagesLogComponent">
            <MessagesLog
              messages={this.state.messages}
              socketId={this.state.socketId}
            />
          </Grid>
          <Grid item sm={12} className="messagesNewMessageComponent">
            <NewMessage handleSubmit={this.handleSubmit} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(App);
