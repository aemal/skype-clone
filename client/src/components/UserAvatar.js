import React, { Component } from 'react';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Avatar from './skypeAvatar';

const styles = {
  row:{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  avatar:{
    position: 'relative',
    bottom: 0,
    left: '10%'
  },
  
  iconsContainer:{
    float: 'right',
  },
  icons:{
    height: 60,
  },
  img:{
    width: '100%',
  }
  
};



class UserAvatar extends Component {

  render() {
     const{classes} = this.props;
    return (
      <div >
        <div className={classes.iconsContainer}>
        <IconButton tooltip="SVG Icon" className={classes.icons}>
          <i className="material-icons">settings</i>
        </IconButton>
        <IconButton className={classes.icons}>
          <i className="material-icons">notifications</i>
        </IconButton>
        <IconButton tooltip="Font Icon" className={classes.icons}>
          <i className="material-icons">exit_to_app</i>
        </IconButton>
        </div>
        <div className={classes.avatar}>
          <Avatar avatar={'http://cdn.skim.gs/images/c_fill,dpr_1.0,f_auto,fl_lossy,h_391,q_auto,w_695/funny-dog-names/funny-dog-names'} size={100} name={'Jose'}/>
        </div>
    </div>
      
    
    );
  }
}

export default withStyles(styles)(UserAvatar);
