import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import classNames from 'classnames';
import Tooltip from 'material-ui/Tooltip';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import {Link} from 'react-router-dom';
const styles = theme =>({
    container:{
        width: 800,
        height: 400,
        margin: '10% auto',
        boxShadow: '3px 3px 9px 3px #777777',
    },
    formWrapper:{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        top: '50px',
        left: '8%',
    },
    textField:{
        marginBottom: 20,
    },
    socialMediaLogin:{
        width: 140,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        top: 120,
        right: '20%',
    },
    
    separatorWrapper:{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        top: 100,
        left: '-42px',
        color: '#777777',
    },
    separator:{
        width: 0.5,
        height: 80,
        backgroundColor: '#777777',
        border: '1px solid #777777',
        position: 'relative',
        left: '50%',
        
    }, 
    social:{
        display:'flex',
        width: '250px',
        marginBottom: 15,
        justifyContent: 'space-between',
        color: 'white',
        
    },
    p:{
        color: '#777777',
    },
    facebook:{
        backgroundColor: '#3B5998',
    },
    google:{
        backgroundColor: '#DD4B39',
    },
    twitter:{
        backgroundColor: '#55ACEE',
    },
    registerNow:{
        textDecoration: 'none',
        color: '#FF6A6F',
    },
    forgotPassword:{
        textDecoration: 'none',
        color: '#777777',
    },
    checkBoxWrapper:{
        display: 'flex',
        marginBottom: 10,
        position:'relative',
        left:'-15px',
    },
    registerWrapper:{
        display:'flex',
        justifyContent: 'space-between',
        width: 260,
    },
    registerSeparator:{
        height: 12,
        border:'1px solid black',
    },
    h3:{
        color: '#777777',
    },
   
});



class SignIn extends Component{
    constructor(){
        super();
        this.state = {
            checked: false,
        }
    }
    
    handleChange = (event)=>{
        this.setState({checked: event.target.checked});
    }


    render(){
        const {classes} = this.props;
        return(
            <Grid container spacing={24} className={classes.container}>
                <Grid item xs>
                    
                        <form className={classes.formWrapper} noValidate autoComplete='off'>
                            <h3 className={classes.h3}>Sing in manually</h3>
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
                            
                                <Button raised color='primary' className={classes.button}>
                                    Login
                                </Button>
                                <div className={classes.checkBoxWrapper}>
                                <Checkbox
                                    checked={this.state.checked}
                                    onChange={this.handleChange}
                                />
                                <p className={classes.p}>Remeber me</p>
                                </div>
                                <div className={classes.registerWrapper}>
                                    <Link className={classes.registerNow} to='#'>Register now</Link>
                                    <div className={classes.registerSeparator}></div>
                                    <Link className={classes.forgotPassword} to='#'>Forgot Password?</Link>
                                </div>
                        </form>
                        
                    </Grid>
                    <Grid item xs>  
                              
                        <div className={classes.separatorWrapper}>
                            <div className={classes.separator}></div>
                            <p className={classes.p}>OR</p>
                            <div className={classes.separator}></div>
                        </div>
                        
                    </Grid>
                    <Grid item xs>
                        <div className={classes.socialMediaLogin}>
                            <Tooltip id='tooltip-top' title='Facebook' placement='top'>
                                <Button className={classNames(classes.social, classes.facebook)} raised><i className="fab fa-facebook-square fa-2x"></i> Sign in with facebook</Button>
                            </Tooltip>
                            <Tooltip id='tooltip-top' title='Google+' placement='top'>
                                <Button className={classNames(classes.social, classes.google)} raised ><i className="fab fa-google-plus fa-2x"></i> Sign in with google</Button>
                            </Tooltip>
                            <Tooltip id='tooltip-top' title='Twitter' placement='top'>
                                <Button className={classNames(classes.social, classes.twitter)} raised><i className="fab fa-twitter fa-2x"></i> Sign in with twitter</Button>
                            </Tooltip>
                        </div>
                    </Grid>
                    
                </Grid>
            
        );
    }
}

export default withStyles(styles)(SignIn);