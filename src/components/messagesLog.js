import React, { Component } from 'react';
import MessageBaloun from './messageBaloun';
import SkypeAvatar from './skypeAvatar';


class MessagesLog extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behaviour: 'smooth' });
  }

  render() {
    const {messages} = this.props;

    const Message = messages.map((message, index, socketId) => {
      let order;

      if(message.socketId === undefined) {
        order = 2
      } else {
        order = ''
      }

      return(
         <div key={index} >

          <div style={{margin:'1%'}} className="message" >

          <div style={{order:order}} >
              <SkypeAvatar avatar={'https://wordsmith.org/words/images/avatar2_large.png'} size={40}/>
           </div>
              <MessageBaloun message={message} />
             </div>
            </div>
        );
    });

    return (
        <div>
          {Message}
          <div ref={el => { this.el = el; }} />
        </div>
    );
  }
}

export default MessagesLog;
