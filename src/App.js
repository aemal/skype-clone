import React, { Component } from 'react';
import UserAvatar from './components/UserAvatar';
import ContactList from './components/contactList';
import ContactDetail from './components/contactDetail';
import MessagesLog from './components/messagesLog';
import NewMessage from './components/newMessage';
import {fetchContactList} from './actions/userActions';
import io  from 'socket.io-client';
import moment from 'moment';
import {connect} from 'react-redux';
import SearchBar from './container/FriendsSearchBar'; //FIXME: Incompatible with Material UI 1.0 Beta. Use react-autosuggest instead.
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

    constructor(props){
      super(props)
      this.state = {
          direction: 'row',
          justify: 'flex-start',
          alignItems: 'stretch',
          socketId: '',
          messages: [],
          moment:moment().startOf('day').fromNow()
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

  componentWillMount(){
    this.props.dispatch(fetchContactList());
  }

  componentDidMount() {
    this.socket = io('http://localhost:8080'); //FIXME: This should come from settings/env variable.
      this.socket.on('connect', (socket) => this.connect(socket));
      this.socket.on('message', message => {
              this.setState({ messages: [...this.state.messages, message]})

      })
  }

  connect(socket) {
    this.setState({
      socketId: this.socket.id,
    });
  
  }

  handleSubmit(event) {
    const body = event.target.value
    let id = this.state.socketId
    let moment = <p>this.state.moment</p>
    if (event.keyCode === 13 && body) {
      const message = {
        body,
        id,
        socketId: this.state.socketId,
        moment,
      }
        this.setState({ messages: [...this.state.messages, message ]})
         this.socket.emit('message', body)
         event.target.value = ''
    }
  }

  render() {
    const { alignItems, direction, justify } = this.state;
    return (
        <Grid container
         alignItems={alignItems} direction={direction} justify={justify}
            item sm={12} lg={12}>
             <Grid item xs={12} sm={4} lg={3} className='app'>
                <Grid >
                  <Paper>
                    <Grid item sm={12} className="sideBarAvatarComponent">
                      <UserAvatar/>
                    </Grid>
                    <Grid item sm={12} className='sideBarContactListComponent'>
                      <ContactList friendsList={this.props.contactList}/>
                    </Grid>
                    <Grid item sm={12}>
                      <SearchBar/>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            <Grid item xs={12} sm={8} lg={9} className='app'>
              <Grid item  sm={12} className='messagesContactDetailComponent'>
                <ContactDetail/>
              </Grid>
              <Grid item sm={12} className='messagesLogComponent'>
                <MessagesLog messages={this.state.messages} socketId={this.state.socketId} />
              </Grid>
              <Grid item sm={12} className='messagesNewMessageComponent'>
                <NewMessage handleSubmit={this.handleSubmit} />
              </Grid>
            </Grid>
        </Grid>
    );
  }
}

export default connect(mapStateToProps)(App);
