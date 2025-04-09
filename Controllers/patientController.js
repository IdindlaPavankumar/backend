const express = require('express')
const Patient = require("../models/Patient"); 
// Post Method
exports.createPatient = async (req, res) => {
    try {
        const { name, age, condition, appointmentDate } = req.body;
        console.log(req.body)
        // check if the required fields are missing
        if (!name|| !age || !condition || !appointmentDate) {
            return res.status(400).json({ error: "All fields are required!"});
        }
        // create a new patient
        const newPatient = new Patient({ name,age,condition,appointmentDate })
        await newPatient.save();
        res.status(201).json({ message: "Patient added successfully", Patient: newPatient });
    }
    catch (err) {
        console.log('here is an error', err)
        res.status(500).json({ error: err.message })
    }
}
// Get Method 
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find() //   fetch all patients from the databases
        res.status(200).json(patients);
    }
    catch (err) {
        console.log('here is an error', err);
        res.status(500).json({ error: err.message })
    }
    
}
// Update Method
exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params; // Extract patient ID from URL parameters
        const updatedData = req.body; // Get updated patient details from request body

        // Find the patient by ID and update it
        const updatedPatient = await Patient.findByIdAndUpdate(id, updatedData, { new: true });

        // If patient not found, return 404 error
        if (!updatedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({ message: "Patient updated successfully", updatedPatient });
    } catch (err) {
        console.error("Error updating patient:", err);
        res.status(500).json({ error: err.message });
    }
};


// Delete Method
exports.deletePatients = async (req, res) => {
    try {
        const { id } = req.params; //Patient ID from URL Parameters
        // Find the Patient by ID and delete it
        const deletePatient = await Patient.findByIdAndDelete(id);
        // if patient not found return 404 error
        if (!deletePatient) {
            res.status(404).json({ message: "Patient Not Found" })
        }
        // if patient is found return delete the patient
        res.status(200).json({ message: "Patient deleted Successfully" });
    }
    catch (err) {
        console.log('here is an error', err)
        res.status(500).json({ error: err.message })
    }
}