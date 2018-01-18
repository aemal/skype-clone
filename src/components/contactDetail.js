import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Avatar from './skypeAvatar';
import FormDialog from './dialog'



const styles =  {
    phoneIcon:{
      fontSize: 40,
      color: 'green',
    },

    videoIcon :{
      fontSize: 48,
      color: 'red',
    },

    container :{
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: 5,
      padding: '10px'
    },

    btns :{
      display: 'flex',
    },

    card :{
      width: 120,
      fontSize: 12,
      textAlign: 'center',
    },
    name :{
      color :'#E0F2F1',
    },

    media :{
      height: 80,
    },
    content :{
      backgroundColor: '#4DB6AC',
    },
  }


class ContactDetail extends Component {
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
    const { classes } = this.props;
    
    return (
      <div className={classes.container}>
        <div className={classes.btns}>
          <Button className = {classes.phoneIcon}><i className= 'material-icons'>phone</i></Button>
          <Button className = {classes.videoIcon}
                  onClick={this.handleClickOpen}>
              <i className='material-icons' >videocam</i>
          </Button>
          <FormDialog
              open={this.state.open}
              handleClickOpen={this.handleClickOpen}
              handleClose={this.handleClose}
              compo={"hello"}
              fullScreen={false}
              />
              
        </div>
          <Avatar avatar={'http://images.entertainment.ie/images_content/rectangle/620x372/E-T.jpg'} size={50} />
      </div>
    );
  }
}

export default withStyles(styles)(ContactDetail);
