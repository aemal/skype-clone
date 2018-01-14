import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import SkypeAvatar from './skypeAvatar';

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
  },
  bigAvatar: {
      width: 60,
      height: 60,
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
    },
});

class ContactList extends Component {

  render() {
  	const { classes } = this.props;
  	const listItems = this.props.friendsList.map((item) => {
  		return (
  			<ListItem key={item.id} dense button className={classes.listItem}>
          <SkypeAvatar avatar={'http://icons.iconarchive.com/icons/icons8/ios7/512/Users-User-Male-2-icon.png' } size={50}/>
  				<ListItemText primary={item.name} />
  			</ListItem>
  			)
  	})
    return (
     <div id="friend-list" className={classes.root}>
       <List>
        {listItems}
       </List>
     </div>
    );
  }
}

export default  withStyles(styles)(ContactList);
