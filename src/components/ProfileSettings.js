
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
import { changeSetting } from "../actions/changeSetting";
import compose from 'recompose/compose';
import { connect } from "react-redux";
import ImageCropper from './ImageCropper';
const styles = theme => ({

  textField: {
    borderRadius: 4,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      padding: 0,
      'label + &': {
        marginTop: theme.spacing.unit * 3,
      },
    },
    Typography: {
      fontSize: "20px",
      marginTop: 10
    },
    pic: {
      fontSize: "20px",
      marginTop: 10,
      float: 'left'
    },
    DatePicker: {
      float: "left",
      marginBottom: 30,
      width: 250
    },
    RadioGroup: {
      display: "inline-block",

      marginBottom: 20
    },
  },
});


class UserPictureAndState extends Component {
  constructor() {
    super();
    console.log(`${config.BASE_URL}images/avatar_placeholder.png`)

    this.state = {
      value: '',
      newUser: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        dateOfBirth: '',
        gender: '',
        avatarURL: `${config.BASE_URL}images/avatar_placeholder.png`
      },
      disabled: true

    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  componentWillMount() {
    let user = decode(localStorage.getItem('token'))
    this.setState({
      userCurrentData: {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        emailAddress: user.emailAddress,
        dateOfBirth: user.dateOfBirth,
        gender: user.profile.gender,
        //avatarURL: user.profile.avatarURL
      }
    })
  }

  componentDidMount() {
    console.log(this.props)
  }

  handleDataChange = date => {
    let checketDate = date.format().substring(0, 10);
    this.setState({
      newUser: { ...this.state.newUser, dateOfBirth: checketDate }
    });
    console.log(checketDate)
  };
  handleImageChange(e) {
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

    /*  this.setState({
       newUser:{
         ...this.state.newUser,
         avatarURL:e.target.f
       }
     }) */
  }
  handleRadioChange = (e, value) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        gender: value
      },
      value: value
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

  handleSubmit(e) {
    e.preventDefault();

    var formData = new FormData(e.target);
    let data = this.state.newUser;

   
    console.log(formData)
    
    let url = `${config.BASE_URL}user/profile_edit/${uuidv1()}`;
    let token = localStorage.getItem("token");

    if (this.state.newUser.avatarURL !== '') {
      console.log('hi')

     // this.props.changeUserSetting(url,formData)
     
        fetch(url, {
        method: "POST",
        headers: { 
          'Authorization': `TOKEN ${token}`
        },
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          console.log("Json Data: ", data); 
          if(data){
            localStorage.setItem('updatedUserData',JSON.stringify(data))
           /*  setTimeout(() => {
              window.location.reload();
            },400) */
            
          }       
          
        }) 
        .catch(err => console.log(err));  

    } else {
      console.log({ Error: "Fields are required" }); //Handle errors here...
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className={classes.row}>
        <Grid item xs>
          <form
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit.bind(this)}
            encType="multipart/form-data"
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
              className={classes.textField}
              label={this.state.userCurrentData.emailAddress}
              onChange={this.handleInputChange}
              name="emailAddress"
            />

            <TextField
              id="dateOfBirth"
              className={classes.textField}
              value={this.state.newUser.dateOfBirth || this.state.userCurrentData.dateOfBirth}
              onChange={this.handleInputChange}
              name="dateOfBirth"
              type="hidden"
            />

            <div className="picker">
              <Typography
                type="caption"
                align="left"
                gutterBottom
                className={classes.pic}
              >
                Date of Birth
                </Typography>
              <DatePicker
                keyboard
                value={this.state.userCurrentData.dateOfBirth}
                labelFunc={date => moment(date).format("Do MMMM YYYY")}
                onChange={this.handleDataChange}
                className={classes.DatePicker}
              />
            </div>
            <Button type="submit" className="login-button" >
              SAVE
              </Button>
          </form>

        </Grid>
        <Grid item xs>
          <ImageCropper imgSrc={this.state.newUser.avatarURL} />
          <TextField
            id="file"
            className={classes.textField}
            label={'change Pic'}
            onChange={this.handleImageChange}
            name="avatar"
            type='file'

          />

        </Grid>
      </Grid>
    )
  }
}

/* const mapDispatchToProps = (dispatch) => {
  return {
    changeUserSetting: (url, formData) => { dispatch(changeSetting(url, formData)) }
  }

  }; */



export default withStyles(styles)(UserPictureAndState)
 /*  withStyles(styles),
  connect(null, mapDispatchToProps)
)(UserPictureAndState);

  */

