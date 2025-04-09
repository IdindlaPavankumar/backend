const express = require('express')
const Appointment = require('../models/Appointment');
// Post method
exports.createAppointment = async (req, res) => {
    try {
        console.log(" Received Data:", req.body);

        const { name, email, phone, age, condition, date, doctor, time, reason } = req.body;

        if (!name || !email || !phone || !age || !condition || !date || !doctor || !time || !reason) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Ensure age is stored as a number
        const parsedAge = parseInt(age, 10);
        if (isNaN(parsedAge)) {
            return res.status(400).json({ error: "Invalid age format" });
        }

        const newAppointment = new Appointment({
            name,
            email,
            phone,
            age: parsedAge, // Ensure correct data type
            condition,
            date: new Date(date), // Ensure date format
            doctor,
            time,
            reason,
            status: "Pending"
        });

        await newAppointment.save();
        res.status(201).json({ message: " Appointment successfully booked", appointment: newAppointment });

    } catch (err) {
        console.error(" Error in appointment creation:", err);
        return res.status(500).json({ error: err.message });
    }
};

// Get Method
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
        res.status(200).json(appointments)
    }
    catch (err) {
        console.log("here is an err", err)
        res.status(500).json({ error: message })
    }
}
// patch medthod for confirm the appointment
exports.confirmAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: "Confirmed" },
            { new: true }
        );
        // if appiontment is not found return 404 error
        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" })
        }
        //if found  the appointment return appointment successful
        res.json({ message: "Appointment confirmed Successfully", appointment: updatedAppointment })
    }
    catch (error) {
        res.status(500).json({ message: "server error", error: error.message })
    }

};

// Patch Method for reschedule the appointment
exports.rescheduleAppointment = async (req, res) => {
    try {
        console.log("Request Body Received:", req.body); // Debugging log

        const { date } = req.body; // Extract date

        if (!date) {
            return res.status(400).json({ message: "Date is required" });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { date: new Date(date) }, // Convert string to Date
            { new: true, runValidators: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json({ message: "Appointment rescheduled successfully", appointment: updatedAppointment });
    } catch (error) {
        console.error("Error rescheduling appointment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};




// Delete Method
exports.deleteAppointment = async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        // if appointment not found return 404 error
        if (!deletedAppointment) {
            return res.status(404).json({ error: "Appointment not found!" });
        }
        // if appointment is found return delete the appointment
        res.status(200).json({ message: "Appointment deleted successfully!" });
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}