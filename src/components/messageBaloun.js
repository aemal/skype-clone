import React, { Component } from 'react';

class ContactDetail extends Component {
  render() {
    const {message} = this.props
    let align;
    if(message.socketId === undefined) {
      align = "bubble you"
    } else {
      align = "bubble me"
    }

    return (
              <div className="chat">
              <div className={align}>
                {message.body}
                </div>
            </div>
      );
  }
}

export default ContactDetail;
