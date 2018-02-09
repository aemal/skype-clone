import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Avatar from './skypeAvatar';
import FormDialog from './dialog'
import config from "../config/config.js";


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

    return (
      <div className="contact-list">
        <div style={{width: "100%"}}>
          <div style={{float: "left"}}>
            <div style={{float: "left", marginLeft: 10}}>
            <Avatar avatar={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf5Q3vh1Q4betCuCMiH_rfjdGYUeH8OR-t-8xArUYHKh-MX1O0'} size={50} />  
            </div>

            <Button>
            <i className= 'material-icons'>phone</i>
            </Button>
            <Button onClick={this.handleClickOpen}>
            <i className='material-icons' >videocam</i>
            </Button>
            <FormDialog
            open={this.state.open}
            handleClickOpen={this.handleClickOpen}
            handleClose={this.handleClose}
            compo={"hello asa"}
            fullScreen={false}
            />

            <div>
            </div>
          </div>
          <div style={{float: "right"}}>
            <img src={config.BASE_URL + "images/who_logo.png"} style={{height: 54, marginTop: 5}} />
          </div>
        </div>
          
      </div>
    );
  }
}

export default (ContactDetail);
