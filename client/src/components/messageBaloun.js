import React, { Component } from 'react';

class ContactDetail extends Component {

  render() {

  	let align;
	if(this.props.alignment){
        align = 'bubble you';
	}else{
		align = 'bubble me';
	}
  
    return (
      <div className="chat">
        <div className={align} >Hello there!</div>
      </div>
    );
  }
}

export default ContactDetail;
