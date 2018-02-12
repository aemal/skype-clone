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
    this.handleEnterKey = this.handleEnterKey.bind(this);

  }

  emojiHandle() {

    this.setState({
      emojiClicked: !this.state.emojiClicked
    });
  }
  

    handleChange(evt) {
      if (this.state.selectedEmoji) {
        this.addSpecialChar(evt);
      }
  }
  
  handleEnterKey(e) {
    const body = e.target.value

    if (e.keyCode === 13 && body) {
      this.setState({
        emojiClicked: false
      });
  
      this.props.handleSubmit(e);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="texting-area">
        <FormControl className="form-control">
        
           
            
          <Input
            id="multiline-flexible"
            label="Multiline"
            multiline
            rowsMax="4"
            placeholder="Type your message here"
            //onKeyUp={(e) => handleSubmit(e)}
            onKeyUp={(e) => this.handleEnterKey(e)}
            classes={{
              inkbar: classes.inputInkbar,
            }}
            inputRef={(thisInput) => {this.txtMessage = thisInput}}
            endAdornment={
              <InputAdornment position="end">
              <IconButton onClick={this.emojiHandle} id="emoji" style= {{color : 'orange'}}>
                <InsertEmoticon   />
              </IconButton>
              {this.state.emojiClicked ? <div id="emoji1" style={{ position: 'absolute', bottom: '30px', right: '30px'}}><Emoji txtMessage = {this.txtMessage}/></div> : null}
             </InputAdornment>
            }
            />
            
            
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(NewMessage);
