import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Radio, {RadioGroup} from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel} from 'material-ui/Form';
import {DatePicker} from 'material-ui-pickers';
import Typography from 'material-ui/Typography/Typography';
import moment from 'moment';
import Avatar from './skypeAvatar';

const styles = theme =>({
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    top: "2rem",
  },
  RadioGroupWrapper:{
      display: 'flex',
      marginBottom: 10,
      position:'relative',
      left:'-15px',
  },
  DatePicker:{
      float: 'left',
      marginBottom: 30,
  },
  RadioGroup:{
      display: 'inline-block',
      textAlign: 'left',
      marginBottom: 20,
  },
});



class UserData extends Component{
    constructor(){
        super();
        this.state = {
            value: '',
            selectedDate: moment(),
            formTitle:'Sing Up',
            buttonTitle:'Sing Up'
        }
    }

    handleChange = (event, value)=>{
        this.setState({value});
    }

    handleDataChange = (date)=>{
        console.log('selectedDate',this.state.selectedDate);
        console.log('date', date.format());
        this.setState({
            selectedDate: date.format() });
    }
   componentWillMount(){
    if(this.props.place==='setting'){
      this.setState({
        formTitle:"setting",
        buttonTitle:"save",
      })
    }
   }

    render(){
        const {classes} = this.props;

        return(
          <div className="main-container">
          <div className={classes.avatar}>
            <Avatar avatar={'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png'} size={80} />
          </div>
            <h3 className="sign-in-header">Sign up</h3>
            <div className="sign-in-details">
            <form className={classes.formWrapper} noValidate autoComplete='off'>
                <TextField
                    id='firstName'
                    label='First Name'
                    className={classes.textField}
                />
                <TextField
                    id='lastName'
                    label='Last Name'
                    className={classes.textField}
                />
                <TextField
                    id='email'
                    label='Email'
                    className={classes.textField}
                />
                <TextField
                    id='password'
                    label='Password'
                    className={classes.textField}
                />
                <TextField
                    id='password'
                    label='Repeat Password'
                    className={classes.textField}
                />
                <div className='picker'>
                    <Typography type='caption' align='left' gutterBottom className={classes.Typography} >
                        Date of Birth
                    </Typography>
                    <DatePicker
                        keyboard
                        value={this.state.selectedDate}
                        labelFunc={date => moment(date).format('Do MMMM YYYY')}
                        onChange={this.handleDataChange}
                        className={classes.DatePicker}
                    />
                </div>
                <FormControl component='fieldset' className={classes.FormControl}>
                    <FormLabel component='legend'>Gender</FormLabel>
                    <RadioGroup
                        aria-label='gender'
                        value={this.state.value}
                        onChange={this.handleChange}
                        className={classes.RadioGroup}
                    >
                        <FormControlLabel value='male' control={<Radio />} label='Male' />
                        <FormControlLabel value='female' control={<Radio />} label='Female' />
                        <FormControlLabel value='other' control={<Radio />} label='Other' />
                    </RadioGroup>
                </FormControl>
                <Button className="login-button">
                    {this.state.buttonTitle}
                </Button>
              </form>
            </div>
          </div>
        );
    }
}

export default withStyles(styles)(UserData);
