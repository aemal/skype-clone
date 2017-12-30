import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';




 class AddFriends extends Component {
	render() {
		return (
			<div>
          <SearchBar
            onChange={() => console.log('onChange')}
            onRequestSearch={() => console.log('onRequestSearch')}
            style={{
              margin: '0 auto',
              maxWidth: 700,
             
            }}

          />
			</div>
		);
	}
}

export default AddFriends;