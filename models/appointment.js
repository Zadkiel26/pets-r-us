/*
 Title: appointment.js
 Date: 12/9/2023
 Author: Zadkiel Rodriguez Alvarado
 Description: Setup appointment mongoose model
 Sources:
        https://mongoosejs.com/docs/models.html 
        https://www.youtube.com/watch?v=MYdGwi1glko 
*/
//Import the MongoDB framework
const mongoose = require('mongoose');
//Create the appointmentSchema
const appointmentSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true,
        enum: ['grooming', 'boarding', 'training']
    }
});
//Export the appointment model
module.exports = mongoose.model('Appointment', appointmentSchema);