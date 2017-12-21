import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { FormControl } from 'material-ui/Form';
import Popover from 'material-ui/Popover';
import Input, { InputLabel } from 'material-ui/Input';
import { findDOMNode } from 'react-dom';

const styles = theme => ({
  root: {
    width: '100%',
		height:'65px',
		position:'relative',
		bottom: 0,

  },
  flex: {
    flex: 1,
  },
  searchButton: {
    position: 'absolute',
    top: 9,
    left: 2,
  },
  addButton: {
		position: 'absolute',
    top: 7,
    right: 2,

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


	 handleChange = (event, value) => {
	    console.log(event.target.value)
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
			<div>
	      <AppBar color='primary'  className={classes.root}>
	        <Toolbar>
	        <IconButton
		         ref={node => {
	            this.button = node;
		          }}
	          onClick={this.handleClickButton}
		         className={classes.searchButton}
		         color="contrast"
		         aria-label="Menu">
		         <i className="material-icons">search</i>
	         </IconButton>
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

	             <FormControl className={classes.formControl}>
                   <InputLabel htmlFor="searchContact">search</InputLabel>
	                   <Input
	                     id="searchContact"
	                     type="text"
	                     onChange={this.handleChange.bind(this)}
	                   />
               </FormControl>

	          </Popover>
	          <IconButton className={classes.addButton} color="contrast" aria-label="Menu">
	            <i className="material-icons">add_circle</i>
	          </IconButton>
	        </Toolbar>
	      </AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(SearchBar);
