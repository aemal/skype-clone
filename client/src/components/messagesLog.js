import React, { Component } from 'react';
import SkypeAvatar from './skypeAvatar';
import avatar from './avatar.jpg';

class MessagesLog extends Component {
  constructor(){
  	super();
  	this.state = {
  		avatar: avatar
  	}
  }
  render() {
    return (
		<div>
			<div style={{width:'50%'}}>
				<SkypeAvatar avatar={avatar} size={50}/>
			</div>
			<div style={{width:'50%', float:'right'}}>
				<SkypeAvatar avatar={avatar} size={50}/>
			</div>
		</div>
    );
  }
}

export default MessagesLog;
