import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
const styles = {
  closeDialog:{
    color:'red',
    position:'absolute',
    right:0,
    top:0,
  },
  comp:{
    position:'relative',
  },
}

 class FormDialog extends React.Component {


  render() {
    const { classes } = this.props
    return (
      <div className={classes.comp}>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"></DialogTitle>
          <DialogContent>
            <DialogContentText>
              Hallo world hlekfjklewjflkwejflkewfjelkfjeflkjflejflekfjelkwfjelkfjlkfjslkf
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button className = {classes.closeDialog}
                  onClick={this.props.handleClose}>
              <i className='material-icons' >close</i>
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles) (FormDialog)