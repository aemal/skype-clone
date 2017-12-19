import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
//import Card, {CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from './skypeAvatar';



const styles =  {
phoneIcon:{
  fontSize: 40,
  color: 'green',
},

videoIcon :{
  fontSize: 48,
  color: 'red',
},

container :{
  display: 'flex',
  justifyContent: 'space-between',
  border: '1px solid #4DB6AC',
  borderRadius: 5,
  padding: 10,
  backgroundColor: '#BBDEFB',
},

btns :{
  display: 'flex',
},

card :{
  width: 120,
  fontSize: 12,
  textAlign: 'center',
},
name :{
  color :'#E0F2F1',
},

media :{
  height: 80,
},
content :{
  backgroundColor: '#4DB6AC',
},
}
const User = {
    image: 'http://media2.intoday.in/indiatoday/images/stories/karanvir-story+fb_647_100716010701.jpg',
    name: 'Ahmed'
}

class ContactDetail extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.btns}>
          <Button className = {classes.phoneIcon}><i className= 'material-icons'>phone</i></Button>
          <Button className = {classes.videoIcon}><i className='material-icons' >videocam</i></Button>
        </div>
          <Avatar avatar={'http://images.entertainment.ie/images_content/rectangle/620x372/E-T.jpg'} size={100} name={'ET'} />
      </div>
    );
  }
}

export default withStyles(styles)(ContactDetail);
