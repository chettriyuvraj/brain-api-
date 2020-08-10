const express = require('express');
const { response } = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const image = require('./controllers/image.js');
const profile = require('./controllers/profile.js');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'yuvi1998',
        database: 'smartbrain'
    }
});







const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => { res.json('Server is up!') });

app.post('/register', (req,res) =>{  register.handleRegister(req,res,bcrypt,db)});


app.post('/signin',(req,res)=>{signin.handleSignin(req,res,bcrypt,db)});


app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)});

//put request for image count - to do
app.put('/image',(req,res)=>{image.handleImage(req,res,db)});

app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) });


app.listen(process.env.PORT||3000,()=>
{

    console.log(`Server is up and running on port ${process.env.PORT}!`);

});



// API PLAN 

// '/' -root url - get 
// '/signin' - post - returns success/failure 
// '/register' - post - returns user created to indicte success/failure 
// '/profile/:id' - get - returns all details of profile with that particular id 
// '/image' - put - increase number of entries
