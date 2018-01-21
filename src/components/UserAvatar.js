import React, { Component } from 'react';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Avatar from './skypeAvatar';
import ProfileSettings from './ProfileSettings';
import FormDialog from './dialog';



const styles = {
  row:{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  avatar:{
    position: 'relative',
    bottom: 0,
    padding: '10px',
    order:-1,
  },
  iconsContainer:{
    float: 'right',
    zIndex:"3",
    
  },
  icons:{
    height: 60,
   
  },
  img:{
    width: '100%',
  },
  container:{
    display:'flex',
  }

};



class UserAvatar extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
   
   render() {
     const{classes} = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.iconsContainer}>
         <IconButton  className={classes.icons} onClick={this.handleClickOpen}> 
          <i className="material-icons">settings</i>
         </IconButton>
         <FormDialog
              open={this.state.open}
              handleClickOpen={this.handleClickOpen}
              handleClose={this.handleClose}
              compo={<ProfileSettings/>}
              fullScreen={true}
              
              />
         <IconButton className={classes.icons}>
           <i className="material-icons">notifications</i>
         </IconButton>
         <IconButton tooltip="Font Icon" className={classes.icons}>
           <i className="material-icons">exit_to_app</i>
         </IconButton>
       </div>
       <div className={classes.avatar}>
          <Avatar avatar={'http://cdn.skim.gs/images/c_fill,dpr_1.0,f_auto,fl_lossy,h_391,q_auto,w_695/funny-dog-names/funny-dog-names'} size={100} />
         
       </div>
    </div>


    );
  }
}

export default withStyles(styles)(UserAvatar);
