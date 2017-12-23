import React, { Component } from 'react';
import UserAvatar from './components/UserAvatar';
import ContactList from './components/contactList';
import ContactDetail from './components/contactDetail';
import MessagesLog from './components/messagesLog';
import NewMessage from './components/newMessage';
import {fetchContactList} from './actions/userActions';

import {connect} from 'react-redux';
import SearchBar from './components/FriendsSearchBar';
import './App.css';
import './style.css';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

function mapStateToProps(state,filter) {
  return {
    contactList: state.contactListReducers.contactList.filter( (c) => {
      return c.name.toLowerCase().indexOf(state.contactListFilterReducer.toLowerCase()) > -1
    })
     
  };
}



class App extends Component {

  state = {
      direction: 'row',
      justify: 'flex-start',
      alignItems: 'stretch',
    };


  componentWillMount(){
    this.props.dispatch(fetchContactList());
  }


  render() {
    const { alignItems, direction, justify } = this.state;
    return (
        <Grid container 
         alignItems={alignItems} direction={direction} justify={justify} >
             <Grid item xs={12} sm={3} lg={2} className='app'>

                  <Grid >
                    <Paper>
                      <Grid item  sm={12} className="sideBarAvatarComponent">
                         <Paper>
                           <UserAvatar/>
                         </Paper>
                      </Grid>
                      <Grid item  sm={12} className='sideBarContactListComponent'>
                         <Paper>
                          <ContactList  friendsList={this.props.contactList}/>
                         </Paper>
                      </Grid>
                      <Grid item  sm={12}>
                         <Paper>
                            <SearchBar />
                         </Paper>
                      </Grid>

                    </Paper>
                  </Grid>
              </Grid>


         <Grid  item xs={12} sm={9} lg={10} className='app'>


                   <Grid item  sm={12} className='messagesContactDetailComponent'>
                    <Paper>
                      <ContactDetail />
                    </Paper>
                  </Grid>

                  <Grid item  sm={12} className='messagesLogComponent'>
                    <Paper>
                      <MessagesLog />

                    </Paper>
                  </Grid>

                  <Grid item  sm={12} className='messagesNewMessageComponent'>
                   <Paper>
                      <NewMessage />
                   </Paper>
                  </Grid>


           </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(App);
