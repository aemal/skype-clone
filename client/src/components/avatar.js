import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';


class Avatar extends Component {

  render() {
    return (
    <div>
      <div className="avatarIcons">
        <IconButton tooltip="Font Icon">
          <i className="material-icons">home</i>
        </IconButton>
        <IconButton tooltip="SVG Icon">
           <i className="material-icons">settings</i>
         </IconButton>
      </div>
      <div className="avatarPhoto">
      </div>
      <p>./components/avatar.js</p>
    </div>
    );
  }
}

export default Avatar;
