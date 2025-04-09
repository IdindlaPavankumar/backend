const express = require('express') // import express
const router = express.Router() // import router
const AppointmentsController = require('../Controllers/AppointmentsController') // import controller file
const Appointment = require('../models/Appointment') // import models

router.post('/', AppointmentsController.createAppointment)
router.get('/', AppointmentsController.getAllAppointments)
router.patch('/:id/confirm',AppointmentsController.confirmAppointment);
router.patch('/:id/reschedule',AppointmentsController.rescheduleAppointment)
router.delete('/:id',AppointmentsController.deleteAppointment)
module.exports = router;