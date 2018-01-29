import React from 'react';
import Avatar from 'material-ui/Avatar';
import { ListItemText } from 'material-ui/List';


class SkypeAvatar extends React.Component {

	render(){
    const props = {
        avatarUrl : this.props.avatar,
		    size : this.props.size,
		    key : this.props.key,
		    name : this.props.name,
    }
		const style = {
				width:props.size,
				height:props.size,
                backgroundImage: "url(" + props.avatarUrl + ")",
		}

		return (
			<div>
				<Avatar
					key={props.key}
					alt={props.name}
					className="avatar"
					style={style}
				/>
				<ListItemText style={{textAlign:'center'}} primary={props.name}/>
			</div>
		)
	}
}

export default SkypeAvatar;
