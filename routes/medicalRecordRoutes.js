const express = require('express');
const router = express.Router();
const medicalRecordController = require('../Controllers/medicalRecordController');

//  Create a new medical record
router.post('/', medicalRecordController.CreateNewRecord);
//  Get all medical records
router.get('/', medicalRecordController.getAllRecords);
//  Get a specific medical record by ID
router.get('/:id', medicalRecordController.getRecordById);
//  Update a medical record
router.put('/:id', medicalRecordController.updateRecord);
// Delete a medical record
router.delete('/:id', medicalRecordController.deletedRecord)
//  Manage prescription (Add/Update)
router.patch('/:id/prescription', medicalRecordController.managePrescription);
module.exports = router;
