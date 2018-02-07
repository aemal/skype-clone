import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import './mainPage.css'
const styles = {
    root: {
      width: '99%',
      
      top:0,
    },
  };

class mainPage extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className='background'>
                <div className='container'>
                 <AppBar position="fixed" color="default">
                   <Toolbar>
                    <BottomNavigation>
                      <BottomNavigationAction label="Recents" />
                      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
                    </BottomNavigation>
                   </Toolbar>
                  </AppBar>
                  <div className='wellcomeMessageContainer'>
                    <h2 className='wellcomeMessage'>Wellcome to DCI Messenger</h2>
                    <h3 className='about'>Don't Stop when you'r tired. Stop when you'r done</h3>
                    <button className='loginButoon'>
                        Login
                    </button>
                    <button className='signUpButton'>
                       Sign Up
                    </button>
                  </div>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(mainPage )