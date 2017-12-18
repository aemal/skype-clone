import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
  },
});

class ContactList extends Component {
 
  render() {
  	const { classes } = this.props;
  	console.log(this.props.contactList)
  	const listItems = this.props.contactList.map((item) => {
  		return (
  			<ListItem key={item.id} dense button className={classes.listItem}>
  				<Avatar alt={item.name} src='https://d30y9cdsu7xlg0.cloudfront.net/png/10299-200.png' />
  				<ListItemText primary={item.name} />
  			 </ListItem>
  			)
  	})
    return (
     <div className={classes.root}>
       <List>
        {listItems}
       </List>
     </div>
    );
  }
}

export default  withStyles(styles)(ContactList);
