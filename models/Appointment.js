const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    condition: { type: String, required: true },
    date: { type: Date, required: true },
    doctor: { type: String, required: true },
    time: { type: String, required: true },
    reason: { type: String, required: true },

    // Add this block 👇
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Confirmed", "Cancelled"]
    }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
