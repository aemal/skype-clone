import React, {Component}from 'react';
import UserData from './UserData';
// import SocialMedia from './SocialMedia';

export default class SingUp extends Component {
    render() {
        return (
                <UserData history={this.props.history}/>
        )
    }
}
