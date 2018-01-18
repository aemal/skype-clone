import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Radio, {RadioGroup} from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel} from 'material-ui/Form';
import {DatePicker} from 'material-ui-pickers';
import Typography from 'material-ui/Typography/Typography';
import moment from 'moment';
import Paper from 'material-ui/Paper';

const styles = theme =>({
    container:{
        width: '50%',
        margin: '7% auto',
        textAlign: 'center',
    },
    formWrapper:{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        margin: '0 auto',
        alignItems:'stretch',
        textAlign: 'center',
        
    },
    Paper:{
        width: '80%',
        margin: '8% auto',
    },
    textField:{
        marginBottom: 20,
    },

    p:{
        color: '#777777',
    },
    
    
    RadioGroupWrapper:{
        display: 'flex',
        marginBottom: 10,
        position:'relative',
        left:'-15px',
    },
    
    
    h3:{
        color: '#777777',
    },
    Typography:{
        fontSize: '20px',
        marginTop: 10,
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
    FormControl:{
        textAlign: 'left',
    },
    
    button:{
        marginBottom: 30,
    },


});



class UserData extends Component{
    constructor(){
        super();
        this.state = {
            value: '',
            selectedDate: moment(),
        }
    }
    
    handleChange = (event, value)=>{
        this.setState({value});
    }

    handleDataChange = (date)=>{
        console.log('selectedDate',this.state.selectedDate);
        console.log('date', date.format());
        this.setState({
            selectedDate: date.format() });
    }


    render(){
        const {classes} = this.props;
        return(

            <Grid>
                <Grid item xs={12} lg={12} sm={12}>
                    <Paper  elevation={4} className={classes.Paper}>
                        <form className={classes.formWrapper} noValidate autoComplete='off'>
                            <h3 className={classes.h3}>Sing Up</h3>
                            <TextField
                                id='password'
                                label='First Name'
                                className={classes.textField}
                            />
                            <TextField
                                id='password'
                                label='Last Name'
                                className={classes.textField}
                            />
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
                            <TextField
                                id='password'
                                label='Repeat Password'
                                className={classes.textField}
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
                                <Button raised color='primary' className={classes.button}>
                                    Sing Up
                                </Button>
                                
                            
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(UserData);