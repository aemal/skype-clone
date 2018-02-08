import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import Avatar from "./skypeAvatar";
import ProfileSettings from "./ProfileSettings";
import FormDialog from "./dialog";

const styles = {
  root: {
    flexGrow: 1
  },
  row: {
    display: "flex",
    justifyContent: "center"
  },
  avatar: {
    position: "relative",
    padding: "1rem"
  },
  img: {
    width: "100%"
  }
};

class UserAvatar extends Component {
  state = {
    open: false
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
      <div className={classes.root}>
        <div className={classes.avatar}>
          <Avatar size="100px" avatar={this.props.avatarURL} />
        </div>
        <div className="icons">
          <IconButton onClick={this.handleClickOpen}>
            <i className="material-icons">settings</i>
          </IconButton>
          <FormDialog
            open={this.state.open}
            handleClose={this.handleClose}
            compo={<ProfileSettings />}
            fullScreen={true}
          />

          <IconButton>
            <i className="material-icons">notifications</i>
          </IconButton>
          <IconButton>
            <i className="material-icons">exit_to_app</i>
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UserAvatar);
