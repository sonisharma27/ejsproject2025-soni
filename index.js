const express = require('express');
const path = require('path');
const coonect = require('./connection');
const makeAdmin = require('./makeadmin');
const user = require('./routes/user');
const student = require('./routes/student');
const app  = express();
app.use(express.urlencoded({extended : false}));
app.use(user);
app.use(student);
coonect();
makeAdmin();
app.set('view engine' , 'ejs');
app.set('views', path.resolve('./views'));

app.listen(3000, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Server is running on port 3000');
    }
})