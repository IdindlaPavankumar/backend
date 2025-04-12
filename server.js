const express = require('express'); //import express
const mongoose = require('mongoose'); //import mongoose database
const patientsRoutes = require('./routes/patientsroutes'); // import routes because we can use method
const appointmentRoutes = require('./routes/appointmentroutes')
const medicalRoutes = require('./routes/medicalRecordRoutes')
const authRoutes = require('./routes/authroutes')
require('dotenv').config(); // Correct dotenv import
const cors = require('cors'); // import cors because to connect to frontend
// const MedicalRecords = require('./models/MedicalRecords');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()) // frontend connection URL
// Routes
app.use('/api/auth',authRoutes)
app.use('/api/patients', patientsRoutes);// patients api
app.use('/api/appointments',appointmentRoutes) // appointments api
app.use('/api/medicalrecords',medicalRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB is connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Server Setup
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
