import React, { Component } from 'react';
import SkypeAvatar from './skypeAvatar';
import MessageBaloun from './messageBaloun';

class MessagesLog extends Component {
  render() {
    return (
        <div>
          <div style={{margin:'1%'}} className="message" >
            <div style={{order:2}} >
             <SkypeAvatar avatar={'https://wordsmith.org/words/images/avatar2_large.png'} size={40}/>
            </div>
            <MessageBaloun alignment={true} />
          </div>
        </div>
    );
  }
}

export default MessagesLog;
