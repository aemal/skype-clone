
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { DatePicker } from "material-ui-pickers";
import moment from "moment";
import TextField from "material-ui/TextField";
import config from "../config/config.js";
import Typography from "material-ui/Typography/Typography";
import decode from "jwt-decode";
import uuidv1 from "uuid/v1";
import Grid from "material-ui/Grid";
import { Redirect } from 'react-router';
//import { changeSetting } from "../actions/changeSetting";
//import compose from 'recompose/compose';
//import { connect } from "react-redux";
import ImageCropper from './ImageCropper';


const styles = theme => ({
  textField: {
    width: 300,
    float: 'left',
    marginBottom: 10,
  },
  emailAddress: {
    width: 300,
    float: 'left',
    marginBottom: 30,
  },

  pickerContainer: {
    width: 200,
  },

  datePicker: {
    width: 300,
  }


});


class UserPictureAndState extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      submittedImgValue: '',
      newUser: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        dateOfBirth: '',
        gender: ''
      },
      disabled: true

    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleimageChange = this.handleimageChange.bind(this);
  }
  componentWillMount() {
    let oldCredentials = decode(localStorage.getItem('token'));
    let user = JSON.parse(localStorage.getItem('updatedUserData'));
    console.log('oldCredentials', oldCredentials);
    console.log('user', user);

    if (user) {
      this.setState({
        userCurrentData: {
          firstName: user.user.profile.firstName,
          lastName: user.user.profile.lastName,
          emailAddress: user.user.emailAddress,
          dateOfBirth: user.user.dateOfBirth,
          gender: user.user.profile.gender,
          avatarURL: user.user.profile.avatarURL

        }
      });
    } else {
      this.setState({
        userCurrentData: {
          firstName: oldCredentials.profile.firstName,
          lastName: oldCredentials.profile.lastName,
          emailAddress: oldCredentials.emailAddress,
          dateOfBirth: oldCredentials.dateOfBirth,
          gender: oldCredentials.profile.gender,
          avatarURL: oldCredentials.profile.avatarURL
        }

      });
    }
  }

  handleDataChange = date => {
    let checkedDate = date.format().substring(0, 10);
    this.setState({
      newUser: { ...this.state.newUser, dateOfBirth: checkedDate }
    });
  };


  handleimageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        newUser: {
          ...this.state.newUser,
          avatarURL: reader.result
        },
        disabled: false

      });

    }

    reader.readAsDataURL(file);

  }



  handleRadioChange = (e, value) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        gender: value
      },
      value: value
    });
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

  submitForm() {
    let changedEmail = false;
    let formData = new FormData(this.formSettings.target);




    // Only will be updated what the user changes
    //this.state.submittedImgValue === '' ? formData.append('file', this.state.userCurrentData.avatarURL) : formData.append('file', this.state.submittedImgValue);
    this.state.newUser.dateOfBirth === '' ? formData.append('dateOfBirth', this.state.userCurrentData.dateOfBirth) : formData.append('dateOfBirth', this.state.newUser.dateOfBirth);
    this.state.newUser.firstName === '' ? formData.append('firstName', this.state.userCurrentData.firstName) : formData.append('firstName', this.state.newUser.firstName);
    this.state.newUser.lastName === '' ? formData.append('lastName', this.state.userCurrentData.lastName) : formData.append('lastName', this.state.newUser.lastName);
    

    // if the email is empty it will no send nothing
    if (this.state.newUser.emailAddress !== '') {
      formData.append('emailAddress', this.state.newUser.emailAddress);
      changedEmail = true;
    }

    if (this.state.imageChanged) {
      formData.append('file', this.state.submittedImgValue)
    }


    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }


    let url = `${config.BASE_URL}user/profile_edit/${uuidv1()}`;
    let token = localStorage.getItem("token");


    fetch(url, {
      method: "POST",
      headers: {
        'Authorization': `TOKEN ${token}`
      },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          localStorage.setItem('updatedUserData', JSON.stringify(data))

          console.log(changedEmail);
          // 
          if (changedEmail) {
            let url = `${config.BASE_URL}auth/logout`;
            fetch(url, {
              method: "Get",
              headers: {
                Authorization: `TOKEN ${token}`,
              }
            })
              .then(res => res.json())
              .then(data => {
                localStorage.clear();
                this.setState({ redirect: true })
              })
              .catch(err => console.log(err));
          }
           setTimeout(() => {
             window.location.reload();
           }, 2000)

        }

      })
      .catch(err => console.log(err));


  }

  saveCropedImage(file) {
    //let objectURL = URL.createObjectURL(file);
    this.setState({ imageChanged: true, submittedImgValue: file })

  }

  handleSubmit(e) {

    e.preventDefault();

  };

  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect to='/' />
    } else {
      return (
        <Grid container spacing={24} className={classes.row}>
          <Grid item xs>
            <form
              noValidate
              autoComplete="off"
              onSubmit={this.handleSubmit.bind(this)}
              encType="multipart/form-data"
              ref={(form) => this.formSettings = form}
            >
              <TextField
                id="firstName"
                className={classes.textField}
                label={this.state.userCurrentData.firstName}
                onChange={this.handleInputChange}
                name="firstName"
              />

              <TextField
                id="lastName"
                className={classes.textField}
                label={this.state.userCurrentData.lastName}
                onChange={this.handleInputChange}
                name="lastName"
                helperText={this.state.errorMessagelastName}
              />

              <TextField
                id="emailAddress"
                className={classes.emailAddress}
                label={this.state.userCurrentData.emailAddress}
                onChange={this.handleInputChange}
                name="emailAddress"
              />

              <div className={classes.pickerContainer}>
                <Typography
                  type="caption"
                  align="left"
                  gutterBottom
                >
                  Date of Birth
                </Typography>
                <DatePicker
                  keyboard
                  value={this.state.userCurrentData.dateOfBirth}
                  labelFunc={date => moment(date).format("Do MMMM YYYY")}
                  onChange={this.handleDataChange}
                  className={classes.datePicker}
                />
              </div>


              <ImageCropper saveCropedImage={this.saveCropedImage.bind(this)} />

              <Button type="button" className={"login-button"} onClick={this.submitForm.bind(this)} >
                SAVE
              </Button>
            </form>

          </Grid>
        </Grid>
      )
    }
  }
}


export default withStyles(styles)(UserPictureAndState)


