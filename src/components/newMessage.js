import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
// import InsertEmoticon from 'material-ui-icons/InsertEmoticon';

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
  render() {
    const { classes, handleSubmit } = this.props;

    return (
      <div className="texting-area">
        <FormControl className="form-control">
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
         //    endAdornment={
         //   <InputAdornment position="end">
         //       <IconButton>
         //         <InsertEmoticon className="emoticon"/>
         //       </IconButton>
         //   </InputAdornment>
         // } - cannot figure out why the emoticon is not stretching until the end. Not sure if you even need it if everyone has it on their mobiles.
          />
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(NewMessage);
