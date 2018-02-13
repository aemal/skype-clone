import React, { Component } from 'react';
import decode from "jwt-decode";



class ContactDetail extends Component {
  render() {
    const {message} = this.props
    let align;
    //let time = this.props.time;

    let user = decode(localStorage.getItem("token"));

    console.log("message from ballon:", message)
    if(message.userID === user._id) {
      align = "bubble me"
    } else {
      align = "bubble you"
    }
   
    return (
              <div className="chat">
                <div className={align}>
                  {message.messageBody}
                  

                  {/*
                     <span className="timer">
                    {time}
                  </span> */}
                </div>
              
                
            </div>
      );
  }
}


export default  ContactDetail;
