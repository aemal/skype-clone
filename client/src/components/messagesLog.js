import React, { Component } from 'react';
import SkypeAvatar from './skypeAvatar';


class MessagesLog extends Component {
  render() {
    return (
        <div>
          <div>
            <div style={{border: '1px solid', marginTop:'2%'}}>
              <div style={{width: '10%', border: '1px solid'}}>
               <SkypeAvatar avatar={'https://wordsmith.org/words/images/avatar2_large.png'} size={60}/>
              </div>
              <div>
               <p>Hi There!</p>
              </div>
            </div>
          </div>
          <div>
            <div style={{width:'70%'}}>
              <p>Hi There!</p>
            </div>
            <div style={{float:'right', width: '10%', border: '1px solid'}}>
             <SkypeAvatar avatar={'http://www.tollywood.net/Topstoriespics/sonali-rauts-sexy-avatar-in-black.jpg'} size={60}/>
            </div>
          </div>
        </div>
    );
  }
}

export default MessagesLog;
