import React, { Component } from 'react';

class ContactList extends Component {
 
  render() {
  	console.log(this.props.contactList)
    return (
      <div>
        <p>./components/contactList.js</p>
      </div>
    );
  }
}

export default ContactList;
