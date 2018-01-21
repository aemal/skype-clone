import React, { Component } from 'react';
import UserData from './UserData';
import UserPictureAndState from './UserPictureAndState';
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  container: {
    width: 1000,
    height: "auto",
    margin: "1% auto",
    boxShadow: "3px 3px 9px 3px #777777",
   
   
  },
  separatorWrapper: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    top: 100,
    left: "-42px",
    color: "#777777"
  },
  separator: {
    width: 0.5,
    height: 500,
    backgroundColor: "#777777",
    border: "1px solid #777777",
    position: "relative",
    left: "50%"
  },
});
class ProfileSettings extends Component {
  


  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className={classes.container}>
          <Grid item xs>
             <UserData place={"setting"}/>
          </Grid> 
          <Grid item xs>
            <div className={classes.separatorWrapper}>
              <div className={classes.separator} />
            </div>
          </Grid>
          <Grid item xs>
             <UserPictureAndState/> 
          </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles) (ProfileSettings);
