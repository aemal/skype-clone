import React, { Component } from 'react';



class ContactDetail extends Component {
  render() {
    const {message} = this.props
    let align;
    let time = this.props.time;
    if(message.socketId === undefined && time) {
      align = "bubble you"
    } else {
      align = "bubble me"
    }
   
    return (
              <div className="chat">
                <div className={align}>
                  {message.body}
                  <span className="timer">
                    {time}
                  </span>
                </div>
              
                
            </div>
      );
  }
}


export default  ContactDetail;
