import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import { Link } from "react-router-dom";
import SocialMedia from "./SocialMedia";
import decode from "jwt-decode";
import Avatar from "./skypeAvatar";
import { login } from "../actions/login";
import { connect } from "react-redux";
import config from '../config/config.js';

const styles = theme => ({
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    top: "2rem"
  },
  registerNow: {
    textDecoration: "none",
    color: "#FF6A6F"
  },
  forgotPassword: {
    textDecoration: "none",
    color: "#777777"
  }
});

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      checked: event.target.checked
    });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    let url = "{config.BASE_URL}auth/login";
    const formData = {
      checked: this.state.checked,
      username: this.state.email,
      password: this.state.password
    };
    console.log(formData);

    if (formData) {
      const searchParams = Object.keys(formData)
        .map(key => {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
          );
        })
        .join("&");

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: searchParams
      })
        .then(res => res.json())
        .then(data => {
          let user = decode(data.token);
          console.log(user);
          localStorage.setItem("token", data.token);
          //this.props.history.push("/auth");
        })
        .catch(err => console.log(err));
    } else {
      console.log({ Error: "Fields are required" }); //Handle errors here...
    }
    /* let url = 'localhost:3001/login';
   let email = this.state.email;
   let password = this.state.password;
   loginRequest(url,email,password)
 

  this.props.login(this.state).then(
    (res) => this.context.router.push('/auth'),
  )*/
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
            size={150}
          />
        </div>

        <div className="sign-in-details">
          <form
            className={classes.formWrapper}
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <TextField
              id="email"
              label="Email"
              placeholder="Email"
              onChange={this.handleEmailChange}
            />
            <TextField
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
            <Button
              raised
              color="secondary"
              type="submit"
              className="login-button"
            >
              Login
            </Button>
            <div className="additional-options">
              <Checkbox
                className="color-checkbox"
                checked={this.state.checked}
                onChange={this.handleChange}
              />
              <p>Remeber me</p>
              <Link className="link" to="/singup">
                <p>Register now</p>
              </Link>
              <Link className="link" to="#">
                <p>Forgot Password?</p>
              </Link>
            </div>
          </form>
          <SocialMedia />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(connect(null, { login })(SignIn));
