import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
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
    this.logEmoji = this.logEmoji.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  emojiHandle() {
    this.setState({
      emojiClicked: !this.state.emojiClicked
    });
  }
  
  logEmoji(data,emoji){
    /*let currentEmoji = jsemoji.replace_unified(`:${emoji.name}:`);
   
    this.setState({
      selectedEmoji: currentEmoji,
    });*/
    console.log(emoji);
    console.log(this.data);
    
  
    
  }

  handleChange(evt) {
    if (this.state.selectedEmoji) {
      this.addSpecialChar(evt);
    }
}
  
  render() {
    let settings = {
      imageType: 'png',
      sprites: true
    };
    const { classes, handleSubmit } = this.props;

    return (
      <div className="texting-area">
        <FormControl className="form-control">
        
        <InputAdornment position="end">
                <IconButton>
                <InsertEmoticon onClick={this.emojiHandle} />
                {this.state.emojiClicked ? <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}><Emoji onEmojiClick={this.logEmoji} txtMessage = {this.txtMessage}/></div> : null}
                </IconButton>
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
