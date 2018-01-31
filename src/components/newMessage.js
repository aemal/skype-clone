import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputAdornment } from 'material-ui/Input';
import InsertEmoticon from 'material-ui-icons/InsertEmoticon';
import { FormControl } from 'material-ui/Form';
import Emoji from './emoji'

const styles = theme => ({

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  inputLabelFocused: {
    color: '#3BA8C6',
  },
  inputInkbar: {
    '&:before': {
      backgroundColor: '#79848E',
    },
    '&:after': {
      backgroundColor: '#3BA8C6',
    },
  }
})

class NewMessage extends Component {
  constructor(props){
    super(props);
    this.state = {
      emojiClicked: false,
      selectedEmoji: '',
      value: ''
    }
    this.emojiHandle = this.emojiHandle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  emojiHandle() {
    console.log("AAAsss")

    this.setState({
      emojiClicked: !this.state.emojiClicked
    });
  }
  

  handleChange(evt) {
    if (this.state.selectedEmoji) {
      this.addSpecialChar(evt);
    }
}
  
  render() {
    const { classes, handleSubmit } = this.props;

    return (
      <div className="texting-area">
        <FormControl className="form-control">
        
            <InputAdornment position="end">
                <IconButton onClick={this.emojiHandle} >
                  <InsertEmoticon   />
                </IconButton>
                {this.state.emojiClicked ? <div style={{ position: 'absolute', bottom: '20px', right: '20px'}}><Emoji txtMessage = {this.txtMessage}/></div> : null}
         
            </InputAdornment>
            
          <Input
            id="multiline-flexible"
            label="Multiline"
            multiline
            rowsMax="4"
            placeholder="Type your message here"
            onKeyUp={(e) => handleSubmit(e)}
            classes={{
              inkbar: classes.inputInkbar,
            }}
            inputRef={(thisInput) => {this.txtMessage = thisInput}}
            />
            
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(NewMessage);
