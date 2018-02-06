import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import SkypeAvatar from './skypeAvatar';
import IconButton from "material-ui/IconButton";

const styles = theme => ({
  root: {
    width: '100%',
  },
});

class SearchList extends Component {

  render() {
    const { classes } = this.props;
    let listItems = "Search a new friend";
    if(this.props.users !== ''){
     listItems = this.props.users.map(item => {
      return (
        <ListItem key={item._id} dense button className="list-item">
          <SkypeAvatar
            avatar={
              // the image will be item.avatarURL
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYezaoFgT-pfb5wpqDXxzKXzhQnTLPU5JW5eUvBaKL1H8Rtmu"
            }
            size={45}
          />
          <ListItemText primary={item.profile.firstName + ' ' + item.profile.lastName} />
        <IconButton>
          <i className="material-icons">add_circle_outline</i>
        </IconButton>
        </ListItem>
      );
    });
  }
    return (
      <div id="friend-list" className={classes.root}>
        <List>{listItems}</List>
      </div>
    );
  }
}


export default withStyles(styles)(SearchList);