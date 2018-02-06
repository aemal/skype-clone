import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Tooltip from "material-ui/Tooltip";
import classNames from "classnames";
import Button from "material-ui/Button";

const styles = theme => ({
  social: {
    width: "20px"
  }
});

class SocialMedia extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="social-media-login-main">
        <div className="social-media-login">
          <Tooltip id="tooltip-top" title="Facebook" placement="top">
            <Button
              className={classNames(classes.social, classes.facebook)}
              raised
            >
              <i className="fa fa-facebook-square fa-2x" /> Sign in with
              facebook
            </Button>
          </Tooltip>
          <Tooltip id="tooltip-top" title="Google+" placement="top">
            <Button
              className={classNames(classes.social, classes.google)}
              raised
            >
              <i className="fa fa-google-plus fa-2x" /> Sign in with google
            </Button>
          </Tooltip>
          <Tooltip id="tooltip-top" title="Twitter" placement="top">
            <Button
              className={classNames(classes.social, classes.twitter)}
              raised
            >
              <i className="fa fa-twitter fa-2x" /> Sign in with twitter
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SocialMedia);
