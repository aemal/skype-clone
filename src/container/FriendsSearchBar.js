import React, { Component } from 'react';
//import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { FormControl } from 'material-ui/Form';
import Popover from 'material-ui/Popover';
import Input, { InputLabel } from 'material-ui/Input';
import { findDOMNode } from 'react-dom';
import {setFilter }from '../actions/filterAction';
import {connect} from 'react-redux';
import Modal from '../components/Modal';


const mapDispatchToProps = dispatch => ({
 onFilter: filter => dispatch(setFilter(filter))
      
    

})


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
	   showModal: false
	 };
    
	  hideModal = () => {
	     this.setState({showModal: false});
	   };
	  showModal = () => {
	     this.setState({showModal: true});
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
		//const { classes } = this.props;
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
	      <AppBar color='primary' style={{position: 'relative',bottom:0, height:65}}>

	        <Toolbar>
	        <IconButton
		         ref={node => {
	            this.button = node;
		          }}
	          onClick={this.handleClickButton}
		         color="contrast"
                         id="cypress-friend-search-button"
		        style={{position:'absolute',top:9,left:2}}
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

	             <FormControl >
                   <InputLabel htmlFor="searchContact">search</InputLabel>
	                   <Input
	                     id="searchContact"
	                     type="text"
	                     onChange={e =>{
	                      
	                      this.props.onFilter(e.target.value)
	                    }}
	                   />
               </FormControl>

	          </Popover>
	          <IconButton  color="contrast" aria-label="Menu" style={{position:'absolute',top:7,right:2}} onClick={this.showModal.bind(this)}>

	            <i className="material-icons">add_circle</i>
	          </IconButton>
	          {this.state.showModal ?
	                    <Modal onClose={this.hideModal}>
	                     
	                    </Modal> : null}
	        </Toolbar>
	      </AppBar>
			</div>
		);
	}
}



export default connect(null, mapDispatchToProps)(SearchBar)
	 	
