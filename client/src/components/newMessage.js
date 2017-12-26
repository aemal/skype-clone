import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import InsertEmoticon from 'material-ui-icons/InsertEmoticon';
import purple from 'material-ui/colors/purple';

const styles = theme => ({

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%'
  },
  inputLabelFocused: {
    color: purple[500],
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: purple[500],
    },
}
})

class NewMessage extends Component {
  render() {
    const { classes } = this.props;
    return (
    <div className={classes.container}>
          <FormControl className={classes.formControl}>
            <InputLabel
              FormControlClasses={{
                focused: classes.inputLabelFocused,
              }}
              htmlFor="custom-color-input"
            >
              Type your message here..
            </InputLabel>
            <Input
              classes={{
                inkbar: classes.inputInkbar,
              }}
              id="custom-color-input"
              endAdornment={
             <InputAdornment position="end">
                 <IconButton>
                     <InsertEmoticon />
                   </IconButton>
             </InputAdornment>
           }
            />
          </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(NewMessage);
