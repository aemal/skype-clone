import React, { Component } from 'react';
import Avatar from './components/avatar';
import ContactList from './components/contactList';
import ContactDetail from './components/contactDetail';
import MessagesLog from './components/messagesLog';
import NewMessage from './components/newMessage';
import {fetchContactList} from './actions/userActions';
import {connect} from 'react-redux';
import './App.css';
import './style.css';

function mapStateToProps(state) {
  return {
    contactList: state.contactList
  };
}

class App extends Component {

  componentWillMount(){

    this.props.dispatch(fetchContactList());

  }


  render() {

    return (
      <div>
        <div className="sideBarMainComponent">
          <div className="sideBarAvatarComponent">
            <Avatar />
          </div>
          <div className="sideBarContactListComponent">
            <ContactList contactList={this.props.contactList.contactList}/>
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

export default connect(mapStateToProps)(App);
