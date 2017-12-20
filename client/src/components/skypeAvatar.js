import React from 'react';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';


class SkypeAvatar extends React.Component {

	render(){
        const props = {
            avatarUrl : this.props.avatar,
		    size : this.props.size,
		    key : this.props.key,
		    name : this.props.name,
		    order : this.props.alignment
        }

        let order;
        if(this.props.alignment){
	        order = '2';
		}else{
			order = '1';
		}

		const style = {
				width:props.size, 
				height:props.size,
				order: order,
                backgroundImage: "url(" + props.avatarUrl + ")",
		}
        
		return(
			<div style={{order:order}}>
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