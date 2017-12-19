import React from 'react';

class SkypeAvatar extends React.Component {

	render(){
        const props = {
            avatarUrl : this.props.avatar,
		    size : this.props.size,
		    key : this.props.key,
		    name : this.props.name
        }
		const style = {
				width:props.size, 
				height:props.size,
                backgroundImage: "url(" + props.avatarUrl + ")",
		}
		return(
			<div style={{padding:'0',}}>
			  <div
				  key={props.key}
				  alt={props.name} 
				  src={props.avatarUrl}
				  className="avatar"
			      style={style}
			   	></div>
		      <p style={{textAlign:'center'}}>{props.name}</p>
		    </div>
			)
	}
}

export default SkypeAvatar;