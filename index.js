/*
 Title: index.js
 Date: 11/26/2023
 Author: Zadkiel Rodriguez Alvarado
 Description: Setup server
 Sources:
        https://youtu.be/A01KtJTv1oc
        https://github.com/buwebdev/web-340/tree/master
*/

//Import the Express framework
const express = require('express');
//Import the MongoDB framework
const mongoose = require('mongoose');
//Import Customer.js
const Customer = require('./models/customer');
//Import the 'path' module for handling file paths
const path = require('path');
//Create an instance of the Express app
const app = express();
//Set the port number to 3000
const port = process.env.PORT || 3000;
//Connect to MongoDB
const CONN = 'mongodb+srv://Zadkiel12:Zakio1226@cluster0.j373lcq.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(CONN).then(() =>{
    console.log('Connected to MongoDB!');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
})

//Set the EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

//Ensure that middleware is parsing the data
app.use(express.urlencoded({ extended: true }));

//Define routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Pets-R-Us | Home',
        pageTitle: 'Landing Page'
    });
});

app.get('/grooming', (req, res) => {
    res.render('grooming', {
        title: "Pets-R-Us | Grooming",
        pageTitle: "Grooming"
    });
});

app.get('/boarding', (req, res) => {
    res.render('boarding', {
        title: "Pets-R-Us | Boarding",
        pageTitle: "Boarding"
    });
});

app.get('/training', (req, res) => {
    res.render('training', {
        title: "Pets-R-Us | Training",
        pageTitle: "Training" 
    });
});

app.get('/register', (req, res) => {
    res.render('register', {
        title: "Pets-R-Us | Register",
        pageTitle: "Register"
    });
});

//Registration
app.post('/register', async (req, res) => {
    try {
        //Request the customerID and email
        const { customerID, email } = req.body;
        //Create the new Customer
        const newCustomer = new Customer({ customerID, email });
        //Save the new customer to the database
        await newCustomer.save();
        //Redirect to landing page if successful
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Registration failed. ' + err + req.body);
    }
});

//Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})