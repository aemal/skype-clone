import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Radio, { RadioGroup } from "material-ui/Radio";
import { FormLabel, FormControl, FormControlLabel } from "material-ui/Form";
import { DatePicker } from "material-ui-pickers";
import Typography from "material-ui/Typography/Typography";
import moment from "moment";
import { signup } from "../actions/signup";
import { connect } from "react-redux";
import Avatar from "./skypeAvatar";

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
      errorMessage: " "
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
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleDataChange = date => {
    let checketDate = date.format().substring(0, 10);
    console.log("date", checketDate);
    this.setState({
      newUser: { ...this.state.newUser, dateOfBirth: checketDate }
    });
  };

  isRequierd(formData) {
    if (formData === undefined) {
      return false;
    } else if (
      formData.firstName === undefined ||
      formData.lastName === undefined ||
      formData.formDataemail === undefined ||
      formData.password === undefined ||
      formData.newPassword === undefined ||
      formData.dateOfBirth === undefined
    ) {
      console.log(FormData.lastName);
      return false;
    } else {
      console.log("FormData.lastName");
      return true;
    }
  }

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
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.newUser);
    let formData = this.state.newUser;
    let url = "http://localhost:3001/auth/signup";

    console.log(this.isRequierd(formData));
    if (this.isRequierd(formData)) {
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
          console.dir(data);
          if (data.success) {
            this.props.history.push("/wellcome");
          } else {
            this.setState({
              error: data.message
            });
            console.log(this.state.error);
          }
        })
        .catch(err => console.log(err));
    } else {
      this.setState({
        errorMessage: "please fill the Required filed"
      }); //Handle errors here...
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
        <div className={classes.avatar}>
          <Avatar
            avatar={
              "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png"
            }
            size={80}
          />
        </div>
        <h3 className="sign-in-header">Sign up</h3>
        <div className="sign-in-details">
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
            />

            <TextField
              id="lastName"
              className={classes.textField}
              label={this.state.settingUserData.lastName}
              onChange={this.handleInputChange}
              name="lastName"
            />

            <TextField
              id="email"
              className={classes.textField}
              label={this.state.settingUserData.email}
              onChange={this.handleInputChange}
              name="email"
            />
            <TextField
              id="password"
              className={classes.textField}
              label={this.state.settingUserData.password}
              onChange={this.handleInputChange}
              name="password"
            />
            <TextField
              id="newPassword"
              className={classes.textField}
              label={this.state.settingUserData.newPassword}
              onChange={this.handleInputChange}
              name="newPassword"
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
                value={this.state.selectedDate}
                labelFunc={date => moment(date).format("Do MMMM YYYY")}
                onChange={this.handleDataChange}
                className={classes.DatePicker}
              />
            </div>
            <FormControl component="fieldset" className={classes.FormControl}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                value={this.state.value}
                onChange={this.handleChange}
                className={classes.RadioGroup}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <Button type="submit" className="login-button">
              {this.state.buttonTitle}
            </Button>
            <div>
              <p className={classes.text}>{this.state.errorMessage}</p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(connect(null, { signup })(UserData));
