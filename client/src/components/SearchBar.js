import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Popover from 'material-ui/Popover';
import Input, { InputLabel } from 'material-ui/Input';
import { findDOMNode } from 'react-dom';

const styles = theme => ({
  root: {
    width: '100%',
    height:'50px'
    
  },
  flex: {
    flex: 1,
  },
  searchButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  addButton: {
    marginLeft: 100,
    marginRight: 20,
  },
  color: {
  	color:'accent',
  }
});

class SearchBar extends Component {
	state = {
	   open: false,
	   anchorEl: null,
	   anchorOriginVertical: 'bottom',
	   anchorOriginHorizontal: 'center',
	   transformOriginVertical: 'top',
	   transformOriginHorizontal: 'center',
	   positionTop: 200, // Just so the popover can be spotted more easily
	   positionLeft: 400, // Same as above
	   anchorReference: 'anchorEl',
	 };


	 handleChange = key => (event, value) => {
	    this.setState({
	      [key]: value,
	    });
	  };

	  handleNumberInputChange = key => event => {
	    
	  };

	  handleClickButton = () => {
	    this.setState({
	         open: true,
	         anchorEl: findDOMNode(this.button),
	       });
	  };

	  handleClose = () => {
	    this.setState({
	      open: false,
	    });
	  };

	  button = null;

	render() {
		const { classes } = this.props;
		const {
		      open,
		      anchorEl,
		      anchorOriginVertical,
		      anchorOriginHorizontal,
		      transformOriginVertical,
		      transformOriginHorizontal,
		      positionTop,
		      positionLeft,
		      anchorReference,
		    } = this.state;
		return (
			<div className={classes.root}>
	      <AppBar position="static" color='primary'>
	        <Toolbar>
	          <Button
	            ref={node => {
	              this.button = node;
	            }}
	            raised
	            className={classes.button}
	            onClick={this.handleClickButton}
	          >
	            <i class="material-icons">search</i>
	          </Button>
	          <Popover
	            open={open}
	            anchorEl={anchorEl}
	            anchorReference={anchorReference}
	            anchorPosition={{ top: positionTop, left: positionLeft }}
	            onClose={this.handleClose}
	            anchorOrigin={{
	              vertical: anchorOriginVertical,
	              horizontal: anchorOriginHorizontal,
	            }}
	            transformOrigin={{
	              vertical: transformOriginVertical,
	              horizontal: transformOriginHorizontal,
	            }}
	          >
	            <Typography className={classes.typography}>
	             <FormControl className={classes.formControl}>
                   <InputLabel htmlFor="searchContact">search</InputLabel>
	                   <Input
	                     id="searchContact"
	                     type="text"
	                     onChange={this.handleNumberInputChange('positionTop')}
	                   />
               </FormControl>
	            </Typography>
	          </Popover>
	          <IconButton className={classes.addButton} color="contrast" aria-label="Menu">
	            <i class="material-icons">add_circle</i>
	          </IconButton>
	        </Toolbar>
	      </AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(SearchBar);


        


       