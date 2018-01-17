import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Tooltip from "material-ui/Tooltip";
import classNames from "classnames";
import Button from "material-ui/Button";

const styles = theme => ({
  socialMediaLogin: {
    width: 140,
    height: 300,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    top: 120,
    right: "20%"
  },
  social: {
    display: "flex",
    width: "250px",
    marginBottom: 15,
    justifyContent: "space-between",
    color: "white"
  },
  facebook: {
    backgroundColor: "#3B5998"
  },
  google: {
    backgroundColor: "#DD4B39"
  },
  twitter: {
    backgroundColor: "#55ACEE"
  }
});

class SocialMedia extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs>
        <div className={classes.socialMediaLogin}>
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
      </Grid>
    );
  }
}

export default withStyles(styles)(SocialMedia);
