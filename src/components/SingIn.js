import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import { login } from "../actions/login";
import { connect } from "react-redux";
import config from "../config/config.js";

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
      password: "",
      loginError:''
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
    localStorage.removeItem("updatedUserData");

    let url = `${config.BASE_URL}auth/login`;
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
          this.props.history.push("/auth");
        })
        .catch(err => {
          console.log(err)
          this.setState({
            loginError:err.message
          })
        
        });
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
        <div className="middle-container">
          <div className="sign-in-details">
            <div className={classes.avatar}>
              <img src={config.BASE_URL + "images/who_logo.png"} className="logo" alt="logo" />
            </div>
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
            </form>
            <div className="additional-options">
              <Link className="link" to="/singup">
                <p>Register</p>
              </Link>
              <Link className="link" to="#">
                <p>Forgot Password?</p>
              </Link>
            </div>
            <span style={{color:'#e80909'}}>{this.state.loginError}</span>
          </div>
         
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(connect(null, { login })(SignIn));
