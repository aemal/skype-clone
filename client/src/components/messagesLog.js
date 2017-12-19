import React, { Component } from 'react';
import SkypeAvatar from './skypeAvatar';
import avatar from './3.jpg';

class MessagesLog extends Component {
  render() {
    return (
        <div>
          <div>
            <div style={{border: '1px solid', marginTop:'2%'}}>
              <div style={{width: '10%', border: '1px solid'}}>
               <SkypeAvatar avatar={avatar} size={60}/>
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
             <SkypeAvatar avatar={avatar} size={60}/>
            </div>
          </div> 
        </div>
    );
  }
}

export default MessagesLog;
