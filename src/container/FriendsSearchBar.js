import React, { Component } from 'react';
//import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { FormControl } from 'material-ui/Form';
import Popover from 'material-ui/Popover';
import Input, { InputLabel } from 'material-ui/Input';
import { findDOMNode } from 'react-dom';
import { setFilter }from '../actions/filterAction';
import { connect } from 'react-redux';
import FormDialog from '../components/dialog'
import AddContact from '../components/Addcontact'



const mapDispatchToProps = dispatch => ({
  onFilter: filter => dispatch(setFilter(filter))
})

class SearchBar extends Component {

  state = {
    open: false,
    contactAddOpen: false,
    anchorEl: null,
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'center',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'center',
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
    anchorReference: 'anchorEl',
  };

  handleClickOpen = () => {
    this.setState({ contactAddOpen: true });
  };
  handleClickClose = () => {
    this.setState({
      contactAddOpen: false,
    });
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
searchFriends(e) {
  this.props.onFilter(e.target.value)
  this.setState({searchKeyword: e.target.value});
} 
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
      <AppBar style={{position: 'relative', height:65, backgroundColor: '#726F6F',
      color: 'white', boxShadow: 'none'}}>
      <Toolbar className="friend-search-bar">
      <IconButton
        ref={node => {
          this.button = node;
        }}
        onClick={this.handleClickButton}
        id="cypress-friend-search-button"
        style={{position:'absolute', top:9, left:2}}
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

      <FormControl className="open-search-bar">
      <InputLabel htmlFor="searchContact">search</InputLabel>
      <Input
        id="searchContact"
        type="text"
        value={this.state.searchKeyword}
        onChange={e =>{
          this.searchFriends(e)
        }}
      />
      </FormControl>
      </Popover>
      <IconButton
        id="cypress-add-freind"
        aria-label="Menu"
        style={{position:'absolute',top:7,right:2}}
        onClick={this.handleClickOpen}>

        <i className="material-icons">add_circle</i>
      </IconButton>
        <FormDialog 
              open={this.state.contactAddOpen}
              handleClickOpen={this.handleClickOpen}
              handleClose={this.handleClickClose}
              compo={<AddContact />}
              autoScrollBodyContent={false}
              fullScreen= {false}
          />
      </Toolbar>
      </AppBar>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(SearchBar)
