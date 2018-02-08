import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { DatePicker } from "material-ui-pickers";
import moment from "moment";
import { Link } from "react-router-dom";
import TextField from "material-ui/TextField";
import config from "../config/config.js";
import Radio, { RadioGroup } from "material-ui/Radio";
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from "material-ui/Form";
import Typography from "material-ui/Typography/Typography";
import decode from "jwt-decode";
import uuidv1 from "uuid/v1";
const styles = theme => ({
  row: {
    display: 'flex',
    flexDirection: 'column',
    
  },
  textField: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    Typography: {
      fontSize: "20px",
      marginTop: 10
    },
    pic:{
      fontSize: "20px",
      marginTop: 10,
      float:'left'
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
  constructor(){
    super();
    this.state={
      value:'',
      newUser:{
        firstName:'',
        lastName:'',
        email:'',
        dateOfBirth:'',
        gender:'',
        avatarURL:''
      },
      disabled:true

    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  componentWillMount(){
   let user = decode(localStorage.getItem('token'))
   console.log(user)
   this.setState({
    userCurrentData:{
      firstName:user.profile.firstName,
      lastName:user.profile.lastName,
      email:user.emailAddress,
      dateOfBirth:user.dateOfBirth,
      gender:user.profile.gender,
      avatarURL:user.profile.avatarURL
    }
   })
  }
  componentDidMount(){
    console.log(this.state.userCurrentData)
  }
  handleDataChange = date => {
    let checketDate = date.format().substring(0, 10);
    console.log(date.format());

    this.setState({
      newUser: { ...this.state.newUser, dateOfBirth: checketDate }
    });
  };
  handleImageChange (e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file)
    console.log(reader)
    
    reader.onloadend = () => {
      console.log(reader.result)
      this.setState({
       newUser:{
        ...this.state.newUser,
        avatarURL: reader.result
       },
       disabled:false 
       
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
    console.log(value);
    this.setState({
      newUser: {
        ...this.state.newUser,
        gender: value
      },
      value:value
    });
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      newUser: {
        [name]: value
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault();


    var formData  = new FormData();
    console.log(this.state.newUser);
    let data = this.state.newUser;

    console.log(data);

    for(var name in data) {
      formData.append(name, data[name]);
    }


    let url = `${config.BASE_URL}user/profile_edit/${uuidv1()}`;
    let token = localStorage.getItem("token");
    console.log(token)
    



    if (data) {

console.log(data)

      fetch(url, {
        method: "POST",
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `TOKEN ${token}`
        },
        body: data
      })
        .then(res => res.json())
         .then(data => {
          console.log('ther is hsit');
          console.log(data)
          let user = decode(data);
         
          //localStorage.setItem("token", data.token);
          this.props.history.push("/auth");
        }) 
        .catch(err => console.log(err));
    } else {
      console.log({ Error: "Fields are required" }); //Handle errors here...
    }
  }


  /*

   handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.newUser);
    let formData = this.state.newUser;
    let url = `${config.BASE_URL}user/profile_edit/${uuidv1()}`;
    let token = localStorage.getItem("token");
    console.log(token)
    



    if (formData) {
      const searchParams = Object.keys(formData)
        .map(key => {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
          );
        })
        .join("&");


        console.log(searchParams)

      fetch(url, {
        method: "POST",
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `TOKEN ${token}`
        },
        body: searchParams
      })
        .then(res => res.json())
         .then(data => {
          console.log('ther is hsit');
          console.log(data)
          let user = decode(data);
         
          //localStorage.setItem("token", data.token);
          this.props.history.push("/auth");
        }) 
        .catch(err => console.log(err));
    } else {
      console.log({ Error: "Fields are required" }); //Handle errors here...
    }

  }

  */
    
     
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      }
        const { classes } = this.props;
        return (
           <div className={classes.row}>
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
                onChange={this.handleChange}
                name="lastName"
                helperText={this.state.errorMessagelastName}
              />

              <TextField
                id="email"
                className={classes.textField}
                label={this.state.userCurrentData.email}
                onChange={this.handleInputChange}
                name="email"
                
              />
              <TextField
                id="file"
                className={classes.textField}
                label={'change Pic'}
                onChange={this.handleImageChange}
                name="picture"
                type='file'
                className={classes.Typography}
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
              <FormControl component="fieldset" className={classes.FormControl}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  value={this.state.value}
                  onChange={this.handleRadioChange}
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
              </FormControl>
              <Button type="submit" className="login-button" >
               SAVE
              </Button>

             
            </form>
          
        </div>
     
        )
    }
}
export default  withStyles(styles)(UserPictureAndState);