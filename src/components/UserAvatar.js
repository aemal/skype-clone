import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import Avatar from "./skypeAvatar";
import ProfileSettings from "./ProfileSettings";
import FormDialog from "./dialog";
import config from "../config/config.js";
import {  Redirect } from 'react-router'


const styles = {
  root: {
    flexGrow: 1,
  },
  row: {
    display: "flex",
    justifyContent: "center"
  },
  avatar: {
    position: "relative",
    padding: "1rem",
  },
  img: {
    width: "100%",
  }
};

class UserAvatar extends Component {
  state = {
    open: false,
    redirect : false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  logOut = () => {
    let token = localStorage.getItem("token");
    let url = `${config.BASE_URL}auth/logout`;
console.log('Asdfd');

    fetch(url, {
      method: "Get",
      headers: {
        Authorization: `TOKEN ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => {
         localStorage.removeItem('token');
         this.setState({ redirect : true })
      })
      .catch(err => console.log(err));

  }


  render() {
    const { classes } = this.props;
    let avatarURL;

    
    if(this.state.redirect){
      return <Redirect to='/'/>
    }else{
    return (
      <div className={classes.root}>
        <div className="icons" style={{ padding: 0, color: "#fff" }}>
          <IconButton onClick={this.handleClickOpen} style={{ zIndex: 1 }}>
            <i className="material-icons" style={{ color: "#fff" }}>settings</i>
          </IconButton>
          <FormDialog
            open={this.state.open}
            handleClose={this.handleClose}
            compo={<ProfileSettings />}
            
          />

          <IconButton onClick={this.logOut} style={{ zIndex: 1 }}>
            <i className="material-icons" style={{ color: "#fff" }}>exit_to_app</i>
          </IconButton>
        </div>
        <div className={classes.avatar} style={{ padding: 10, marginTop: -60 }}>
          <Avatar size="100px" avatar={this.props.avatarURL} />
        </div>
      </div>
      );
    }

  }
}

export default withStyles(styles)(UserAvatar);
