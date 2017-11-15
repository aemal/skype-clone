const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Contact = require('./models/user.model');
const db = 'mongodb://localhost:27017/skypeClone';
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connection.openUri(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/get_users/:id', (request, response)=>{
    Contact.findOne({
        _id: request.params.id
    }).exec((err, contact)=>{
        if(err){
            response.send('We can not find the friends');
        }else{
             response.json(contact.contacts.list);
        }
    });
});

app.get('/get_profile_detail/:id', (request, response)=>{
     Contact.findOne({
        _id: request.params.id
     }).exec((err, contact)=>{
        if(err){
            response.send('Err');
        }else{
            response.json(contact);
        }
     }) 
});

app.listen(port, ()=>{
    console.log('Server is listening to port ' + port);
});

