import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import SkypeAvatar from './skypeAvatar';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  root: {
    width: '100%',
  },
});

class SearchList extends Component {

  render() {
    const { classes } = this.props;
    const listItems = this.props.friendsList.map((item) => {
      return (
        <ListItem key={item.id} dense button className="list-item">
          <SkypeAvatar
          avatar={ 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYezaoFgT-pfb5wpqDXxzKXzhQnTLPU5JW5eUvBaKL1H8Rtmu' }
          size={ 45 }/>
          <ListItemText primary={item.name} />
          <IconButton style= {{position:'relative', float:'right'}}
          >
          <i class="material-icons">add_circle_outline</i>
          </IconButton>
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

export default withStyles(styles)(SearchList);


