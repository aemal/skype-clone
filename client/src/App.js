import React, { Component } from 'react';
import Avatar from './components/avatar';
import ContactList from './components/contactList';
import ContactDetail from './components/contactDetail';
import MessagesLog from './components/messagesLog';
import NewMessage from './components/newMessage';
import AppBar from 'material-ui/AppBar';
import './App.css';
import './style.css';

class App extends Component {

  render() {
    return (
      <div>
        <div className="sideBarMainComponent">
          <div className="sideBarAvatarComponent">
            <Avatar />
          </div>
          <div className="sideBarContactListComponent">
            <ContactList />
          </div>
        </div>
        <div className="messagesMainComponent">
          <div className="messagesContactDetailComponent">
            <ContactDetail />
          </div>
          <div className="messagesLogComponent">
            <MessagesLog />
          </div>
          <div className="messagesNewMessageComponent">
            <NewMessage />
          </div>
        </div>
      </div>
    );
  }
}

export default App;