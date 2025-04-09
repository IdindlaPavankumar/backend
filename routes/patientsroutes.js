const express = require('express')
const router = express.Router()
const patientController = require('../Controllers/patientController');
const Patient = require('../models/Patient')

// Post Method
router.post('/add-Patient', patientController.createPatient)

//get Method
router .get('/All-Patients',patientController.getAllPatients)

// Delete Method
router.delete('/delete/:id',patientController.deletePatients)

//Update Method
router.put('/update/:id',patientController.updatePatient)
module.exports = router