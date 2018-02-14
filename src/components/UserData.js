import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Radio, { RadioGroup } from "material-ui/Radio";
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from "material-ui/Form";
import { DatePicker } from "material-ui-pickers";
import Typography from "material-ui/Typography/Typography";
import moment from "moment";
import config from '../config/config.js';
import { Link } from "react-router-dom";

const styles = theme => ({
  container: {
    width: "50%",
    margin: "7% auto",
    textAlign: "center"
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "0 auto",
    alignItems: "stretch",
    textAlign: "center"
  },
  Paper: {
    width: "80%",
    margin: "8% auto"
  },
  textField: {
    marginBottom: 20,
    width: "100%"
  },

  p: {
    color: "#777777"
  },

  RadioGroupWrapper: {
    display: "flex",
    marginBottom: 10,
    position: "relative",
    left: "-15px"
  },

  h3: {
    color: "#000000"
  },
  Typography: {
    fontSize: "20px",
    marginTop: 10
  },
  DatePicker: {
    float: "left",
    marginBottom: 30,
    width: 250
  },
  RadioGroup: {
    display: "inline-block",
    textAlign: "left",
    marginBottom: 20
  },
  FormControl: {
    textAlign: "left"
  },

  button: {
    marginBottom: 30,
    width: 200
  },
  text: {
    color: "black"
  }
});

class UserData extends Component {
  constructor() {
    super();
    this.state = {
      formTitle: "Sing Up",
      buttonTitle: "Sing Up",
      settingUserData: {
        firstName: "john",
        lastName: "Doe",
        email: "johnDoe@gmail.com",
        password: "******",
        newPassword: "newPasssword"
      },
      newUser: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        newPassword: "",
        dateOfBirth: "",
        gender: ""
      },
      generalerror: " ",
      errorMessageFirstName: " ",
      errorMessagelastName: " ",
      errorMessagePassword: " ",
      errorMessageEmail: "",
      errorMessagedateOfBirth: "",
      errorMessagerepeatPassword: "",
      errorMessageGender: ""
      // firstNameRequired:false,
      // lastNameRequired:false,
      // emailRequired:false,
      // emailValid: false,
      // emailTaken:false,
      // passwordRequired:false,
      // repasswordRequired:false,
      // dateOfBirthRequird:false,
      // genderRequired:false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.isRequierd = this.isRequierd.bind(this);
    this.isPasswordMatch = this.isPasswordMatch.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleDataChange = date => {
    let checketDate = date.format().substring(0, 10);
    console.log(date.format());

    this.setState({
      newUser: { ...this.state.newUser, dateOfBirth: checketDate }
    });
  };

  isRequierd(formData) {
    let bool = true;
    this.setState({
      errorMessageFirstName: " ",
      errorMessagelastName: " ",
      errorMessagePassword: " ",
      errorMessageEmail: "",
      errorMessagedateOfBirth: "",
      errorMessageGender: "",
      errorMessagerepeatPassword: "",
    });

    if (this.state.newUser === undefined) {
      console.log("form");
      this.setState({
        errorMessage: "please fill the Requireds filed"
      });
      bool = false;
    }
    //||  || this.state.newUser.dateOfBirth || this.state.newUser.password || || this.state.newUser.dateOfBirth
    if (this.state.newUser.firstName === "") {
      console.log("form field");
      this.setState({
        errorMessageFirstName: "please fill first name"
      });
      bool = false;
    }

    if (this.state.newUser.lastName === "") {
      console.log("form last name");
      this.setState({
        errorMessagelastName: "please fill last name"
      });
      bool = false;
    }
    if (this.state.newUser.password === "") {
      console.log("form passwoer");
      this.setState({
        errorMessagePassword: "please insert password"
      });
      bool = false;
    }
    if (this.state.newUser.email === "") {
      console.log("form email");
      this.setState({
        errorMessageEmail: "please insert your email address"
      });
      bool = false;
    }
    if (this.state.newUser.newPassword === "") {
      console.log("form repeat password");
      this.setState({
        errorMessagerepeatPassword: "please repeat your password "
      });
      bool = false;
    }
    if (this.state.newUser.dateOfBirth === "") {
      console.log("form dateOfBirth");
      this.setState({
        errorMessagedateOfBirth: "please choose your dateOfBirth "
      });
      bool = false;
    }
    if (this.state.newUser.gender === "") {
      console.log("form gender");
      this.setState({
        errorMessageGender: "please choose your gender "
      });
      bool = false;
    }
    return bool;
  }

  handleChange = (e, value) => {
    console.log(value);
    this.setState({
      newUser: {
        ...this.state.newUser,
        gender: value
      }
    });
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      newUser: {
        ...this.state.newUser,
        [name]: value
      }
    });
  }
  isPasswordMatch = (formData) => {
    let password = formData.password;
    let repeatPassword = formData.newPassword;
    if(password === repeatPassword) {
      return true;
    } else {
     this.setState({
        errorMessagerepeatPassword:'password is not match'
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.newUser);
    let formData = this.state.newUser;
    let url = "http://localhost:3001/auth/signup";

    

    if (this.isRequierd(formData)&& this.isPasswordMatch(formData)) {
       
      const searchParams = Object.keys(formData)
        .map(key => {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
          );
        })
        .join("&");
      console.log(searchParams);
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: searchParams
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data) {
            this.props.history.push("/");
          } else {
            this.setState({
              generalerror: data.message
            });
           
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log("registration error");
      //Handle errors here...
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

  render() {
    const { classes } = this.props;

    return (
      <div className="main-container">
        <div className="middle-container">
          <div className="sign-in-details">
            <div className={classes.avatar}>
              <img src={config.BASE_URL + "images/who_logo.png"} className="logo" alt="avatar" />
            </div>
            <h3 className="sign-in-header">Sign Up</h3>
            <form
              className={classes.formWrapper}
              noValidate
              autoComplete="off"
              onSubmit={this.handleSubmit.bind(this)}
            >
              <TextField
                id="firstName"
                className={classes.textField}
                label={this.state.settingUserData.firstName}
                onChange={this.handleInputChange}
                name="firstName"
                helperText={this.state.errorMessageFirstName}
              />

              <TextField
                id="lastName"
                className={classes.textField}
                label={this.state.settingUserData.lastName}
                onChange={this.handleInputChange}
                name="lastName"
                helperText={this.state.errorMessagelastName}
              />

              <TextField
                id="email"
                className={classes.textField}
                label={this.state.settingUserData.email}
                onChange={this.handleInputChange}
                name="email"
                helperText={this.state.errorMessageEmail}
              />
              <TextField
                id="password"
                className={classes.textField}
                label={this.state.settingUserData.password}
                onChange={this.handleInputChange}
                name="password"
                helperText={this.state.errorMessagePassword}
                type="password"
              />
              <TextField
                id="newPassword"
                className={classes.textField}
                label={this.state.settingUserData.newPassword}
                onChange={this.handleInputChange}
                name="newPassword"
                helperText={this.state.errorMessagerepeatPassword}
                type="password"
              />
              <div className="picker">
                <Typography
                  type="caption"
                  align="left"
                  gutterBottom
                  className={classes.Typography}
                >
                  Date of Birth
                </Typography>
                <DatePicker
                  keyboard
                  value={this.state.newUser.dateOfBirth}
                  labelFunc={date => moment(date).format("Do MMMM YYYY")}
                  onChange={this.handleDataChange}
                  className={classes.DatePicker}
                  helperText={this.state.errorMessagedateOfBirth}
                />
              </div>
              <FormControl component="fieldset" className={classes.FormControl}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  value={this.state.newUser.gender}
                  onChange={this.handleChange}
                  className={classes.RadioGroup}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
                <FormHelperText>{this.state.errorMessageGender}</FormHelperText>
              </FormControl>
              <Button type="submit" className="login-button">
                {this.state.buttonTitle}
              </Button>

              <div className="additional-options text-center" style={{"textAlign": "center"}}>
                <Link className="link" to="/" style={{"display": "block"}}>
                  <p>Login</p>
                </Link>
                
              </div>

              <div>
                <p className={classes.text}>{this.state.generalerror}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UserData);
