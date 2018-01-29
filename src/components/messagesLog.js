import React, { Component } from 'react';
import MessageBaloun from './messageBaloun';
import SkypeAvatar from './skypeAvatar';
import moment from 'moment';

class MessagesLog extends Component {
  constructor(){
    super();

   this.state = {
      moment:moment().calendar()
    }
  }
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
    console.log(this.state.moment)
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
              <SkypeAvatar avatar={'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png'} size={40}/>
           </div>
              <MessageBaloun message={message} time={this.state.moment} />
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
