import React from 'react';
import Avatar from 'material-ui/Avatar';

class SkypeAvatar extends React.Component {

	render(){
        const props = {
            avatarUrl : this.props.avatar,
		    size : this.props.size,
		    key : this.props.key,
		    name : this.props.name
        }
		
		return(
			<div style={{border: '1px solid'}}>
			  <Avatar 
				  key={props.key}
				  alt={props.name} 
				  src={props.avatarUrl}
			      style={{
				   	width:props.size, 
				   	height:props.size,
                    margin:'0 auto',
			      }}
			   	/>
		      <p style={{textAlign:'center'}}>{props.name}</p>
		    </div>
			)
	}
}

export default SkypeAvatar;