import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Avatar from './skypeAvatar';
import FormDialog from './dialog'
import config from "../config/config";
import {connect} from "react-redux";
import VedioCall from "./vedioCall";


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
    let friendDetail = null;
    console.log(this.props.setCurrentFriend.avatarURL);
    let avatarURL = this.props.setCurrentFriend.avatarURL !== "" ? `${config.BASE_URL}/images/avatars/${this.props.setCurrentFriend.avatarURL}` : `${config.BASE_URL}/images/avatar_placeholder.png`;

    if(this.props.setCurrentFriend.avatarURL !== undefined) {
      friendDetail = <div>
                        <div style={{float: "right", marginLeft: 10}}>
                        <Avatar avatar={avatarURL} size={50} />
                        </div>

                        <Button onClick={this.handleClickOpen} style={{float: "right"}}>
                        <i className= 'material-icons'>phone</i>
                        </Button>
                        <FormDialog
                          open={this.state.open}
                          handleClickOpen={this.handleClickOpen}
                          handleClose={this.handleClose}
                          compo={"Comming soon..."}
                          fullScreen={false}
                        />
                        <Button id='cypress-vedio' onClick={this.handleClickOpen}  style={{float: "right"}}>
                        <i className='material-icons' >videocam</i>
                        </Button>
                        <FormDialog
                          open={this.state.open}
                          handleClickOpen={this.handleClickOpen}
                          handleClose={this.handleClose}
                          compo={<VedioCall />}
                          fullScreen={true}
                        />

                        <div>
                        </div>
                      </div>
    }
    return (
      <div className="contact-list">
        <div style={{width: "100%"}}>
          <div style={{float: "left"}}>
            <img src={config.BASE_URL + "images/who_logo.png"} style={{height: 54, marginTop: 5}} alt='logo' />
          </div>
          {friendDetail}

        </div>

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      setCurrentFriend: state.setCurrentFriendReducer,
  };
};

export default connect(mapStateToProps)(ContactDetail);
