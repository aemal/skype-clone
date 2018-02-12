import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import Avatar from "./skypeAvatar";
import ProfileSettings from "./ProfileSettings";
import FormDialog from "./dialog";
import config from "../config/config.js";
//import { Route, Redirect } from 'react-router'


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
    open: false
  };

  handleClickOpen = () => {
    console.log("AAA");
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  logOut = () => {
    //console.log('works');
    let token = localStorage.getItem("token");
    let url = `${config.BASE_URL}auth/logout`;

    fetch(url, {
      method: "Get",
      headers: {
        Authorization: `TOKEN ${token}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => {
         //console.log(data );
         //<Redirect to="/auth/login"/>
      })
      .catch(err => console.log(err));

      console.log({ Error: "Fields are required" }); //Handle errors here...

  }


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className="icons" style={{padding: 0, color: "#fff"}}>
          <IconButton onClick={this.handleClickOpen} style={{zIndex:1}}>
            <i className="material-icons" style={{color: "#fff"}}>settings</i>
          </IconButton>
          <FormDialog
            open={this.state.open}
            handleClose={this.handleClose}
            compo={<ProfileSettings />}
            fullScreen={true}
          />

          <IconButton onClick={this.logOut} style={{zIndex:1}}>
            <i className="material-icons" style={{color: "#fff"}}>exit_to_app</i>
          </IconButton>
        </div>
        <div className={classes.avatar} style={{padding: 10, marginTop: -60}}>
          <Avatar size="100px" avatar={this.props.avatarURL} />
        </div>

      </div>
    );
  }
}

export default withStyles(styles)(UserAvatar);
