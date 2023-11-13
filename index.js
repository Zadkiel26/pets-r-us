//Import the Express framework
const express = require('express');
//Import the 'path' module for handling file paths
const path = require('path');
//Create an instance of the Express app
const app = express();
//Set the port number to 3000
const port = process.env.PORT || 3000;

//Set the EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

//Define routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Pets-R-Us: Home',
        pageTitle: 'Landing Page'
    });
});

app.get('/grooming', (req, res) => {
    res.render('grooming', {
        title: "Pets-R-Us: Grooming",
        pageTitle: "Grooming"
    });
});

//Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})