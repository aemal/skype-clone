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
import {signup} from '../actions/signup';
import {connect} from 'react-redux';

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

class UserData extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      dateOfBirth: moment(),
      formTitle: "Sing Up",
      buttonTitle: "Sing Up",
      settingUserData: {
        firstName: "john",
        lastName: "Doe",
        email: "johnDoe@gmail.com",
        password: "******",
        newPassword: "newPasssword"
      },
      
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleDataChange = date => {
    
    let checketDate = date.format().substring(0, 10);
    console.log("date", checketDate);
    this.setState({
      newUser:{...this.state.newUser,dateOfBirth:checketDate}
    });
  };
  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
  
    this.setState({
      newUser:{
        ...this.state.newUser,
        [name]:value
      }
    });
 
  }
  handleSubmit(e){
    e.preventDefault();
    let formData = this.state.newUser;
    
    let url = "http://localhost:3001/auth/signup";
    if(formData){
        const searchParams = Object.keys(formData).map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
        }).join('&');

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: searchParams
        }).then(res=>res.json()).then(data=>console.log(data)).catch(err=>console.log(err));
    }else{
      console.log({Error: 'Fields are required'}); //Handle errors here...
    }
    
  }
   
  componentWillMount() {
    if (this.props.place === "setting") {
      this.setState({
        formTitle: "setting",
        buttonTitle: "save"
      });
    } else {
      this.setState({
        settingUserData: {
          firstName: "FirstName",
          lastName: "LastName",
          email: "Email Adress",
          password: "password",
          newPassword: "repeat password"
        }
      });
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
            <form className={classes.formWrapper} noValidate autoComplete='off' onSubmit={this.handleSubmit.bind(this)}>
                <TextField
                    id='firstName'
                    className={classes.textField}
                    label={this.state.settingUserData.firstName}
                    onChange={this.handleInputChange}
                    name='firstName'
                />
                <TextField
                    id='lastName'
                    className={classes.textField}
                    label={this.state.settingUserData.lastName}
                    onChange={this.handleInputChange}
                    name='lastName'
                />
                <TextField
                    id='email'
                    className={classes.textField}
                    label={this.state.settingUserData.email}
                    onChange={this.handleInputChange}
                    name='email'
                />
                <TextField
                    id='password'
                    className={classes.textField}
                    label={this.state.settingUserData.password}
                    onChange={this.handleInputChange}
                    name='password'
                />
                <TextField
                    id='newPassword'
                    className={classes.textField}
                    label={this.state.settingUserData.newPassword}
                    onChange={this.handleInputChange}
                    name='newPassword'
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
                <Button type="submit" className="login-button">
                    {this.state.buttonTitle}
                </Button>
              </form>
            </div>
          </div>
        );
      }
    }
      
      
export default withStyles(styles)(connect(null,{signup})(UserData));
