import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Radio, { RadioGroup } from "material-ui/Radio";
import { FormLabel, FormControl, FormControlLabel } from "material-ui/Form";
import { DatePicker } from "material-ui-pickers";
import Typography from "material-ui/Typography/Typography";
import moment from "moment";
import Paper from "material-ui/Paper";

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
  }
});

class UserData extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      selectedDate: moment(),
      formTitle: "Sing Up",
      buttonTitle: "Sing Up",
      settingUserData: {
        firstName: "john",
        lastName: "Doe",
        email: "johnDoe@gmail.com",
        password: "******",
        newPassword: "newPasssword"
      }
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleDataChange = date => {
    console.log("selectedDate", this.state.selectedDate);
    console.log("date", date.format());
    this.setState({
      selectedDate: date.format()
    });
  };
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
      <Grid>
        <Grid item xs={12} lg={12} sm={12}>
          <Paper elevation={4} className={classes.Paper}>
            <form className={classes.formWrapper} noValidate autoComplete="off">
              <h3 className={classes.h3}>{this.state.formTitle}</h3>
              <TextField
                id="password"
                label={this.state.settingUserData.firstName}
                className={classes.textField}
              />
              <TextField
                id="password"
                label={this.state.settingUserData.lastName}
                className={classes.textField}
              />
              <TextField
                id="email"
                label={this.state.settingUserData.email}
                className={classes.textField}
              />
              <TextField
                id="password"
                label={this.state.settingUserData.password}
                className={classes.textField}
              />
              <TextField
                id="password"
                label={this.state.settingUserData.newPassword}
                className={classes.textField}
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
              <Button raised color="primary" className={classes.button}>
                {this.state.buttonTitle}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(UserData);
