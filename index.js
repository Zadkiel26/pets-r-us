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
//Import Appointment.js
const Appointment = require('./models/appointment');
//Import the Services JSON
const servicesData = require('./public/data/services.json');
//Import the 'path' module for handling file paths
const path = require('path');
//Create an instance of the Express app
const app = express();
//Set the port number to 3000
const port = process.env.PORT || 3000;
//Connect to MongoDB
const CONN = 'mongodb+srv://Zadkiel12:Zakio1226@cluster0.j373lcq.mongodb.net/web340DB?retryWrites=true&w=majority';
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
//Handle GET requests to '/' (index)
app.get('/', (req, res) => {
    //Render the 'index' view
    res.render('index', {
        title: 'Pets-R-Us | Home',
        pageTitle: 'Landing Page'
    });
});
//Handle GET requests to '/grooming'
app.get('/grooming', (req, res) => {
    //Render the 'grooming' view
    res.render('grooming', {
        title: "Pets-R-Us | Grooming",
        pageTitle: "Grooming Info"
    });
});
//Handle GET requests to '/boarding'
app.get('/boarding', (req, res) => {
    //Render the 'boarding' view
    res.render('boarding', {
        title: "Pets-R-Us | Boarding",
        pageTitle: "Boarding Info"
    });
});
//Handle GET requests to '/training'
app.get('/training', (req, res) => {
    //Render the 'training' view
    res.render('training', {
        title: "Pets-R-Us | Training",
        pageTitle: "Training" 
    });
});
//Handle GET requests to '/register'
app.get('/register', (req, res) => {
    //Render the 'register' view
    res.render('register', {
        title: "Pets-R-Us | Register",
        pageTitle: "Registration Form"
    });
});
//Handle GET requests to '/customer-list'
app.get('/customer-list', (req, res) => {
    //Use Mongoose's 'find' function to retrieve a list of customer documents from the database
    Customer.find().then(customers => {
        //Render the 'customer-list' view with the retrieved customer data
        res.render('customer-list', {
            title: "Pets-R-Us | Customer List",
            pageTitle: "Customer List",
            customers: customers
        }); 
    }).catch(err => {
        //If there's an error, send a 500 Internal Server Error response with an error message
        res.status(500).send("Customer list failed to load." + err);
    });  
});
//Handle GET requests to '/booking'
app.get('/booking', (req, res) => {
    //Render the 'booking' view
    res.render('booking', {
        title: "Pets-R-Us | Booking",
        pageTitle: "Book your appointment",
        services: servicesData
    });
});
//Handle GET requests to '/my-appointments'
app.get('/my-appointments', (req, res) => {
    //Render the 'my-appointments' view
    res.render('my-appointments', {
        title: "Pets-R-Us | My Appointments",
        pageTitle: "Appointments Info"
    });
});
//Handel GET requests to '/api/appointments/:email'
app.get('/api/appointments/:email', async (req, res) => {
    try {
        //Get the userEmail from the req.params.email
        const userEmail = req.params.email;
        //Find the the appointments with that email
        const appointments = await Appointment.find({ email: userEmail });
        //Respond to the client with the found appointment in JSON format
        res.json(appointments);
    } catch(err) {
        res.status(500).json({ error: "Appointment data failed to load.", details: err});
    }
});

//Handle POST requests to '/register'
app.post('/register', async (req, res) => {
    try {
        //Request the customerID and email
        const { customerID, email } = req.body;
        //Create the new Customer
        const newCustomer = new Customer({ customerID, email });
        //Save the new customer to the database
        await newCustomer.save();
        //Render the register page after successfully registering the user
        res.redirect('/register');
    } catch (err) {
        res.status(500).send('Registration failed. ' + err + req.body);
    }
});
//Handle POST requests to '/appointment'
app.post('/booking', async (req, res) => {
    try{
        //Create a new Appointment using the 'req.body' data
        const newAppointment = new Appointment(req.body);
        //Save the appointment
        await newAppointment.save();
        //Redirect the user to the same page after successfully booking an appointment
        res.redirect('/booking');
    } catch (err) {
        res.status(500).send('Booking failed. ' + err + req.body);
    }
});

//Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})