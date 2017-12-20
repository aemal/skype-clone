import React, { Component } from 'react';

class ContactDetail extends Component {

  render() {
    return (
      <div className="chat">
        <div className="bubble me">Hello there!</div>
        <div className="bubble you">Hi. I'm an expandeable chat box with box shadow. How are you? I expand horizontally and vertically, as you can see here.</div>
        </div>
    );
  }
}

export default ContactDetail;
