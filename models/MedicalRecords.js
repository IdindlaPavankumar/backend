const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  medication: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true }
});

function arrayLimit(val) {
  return val.length > 0;
}

const medicalRecordschema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  condition: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
  reports: { type: [String] },
  prescriptions: {
    type: [prescriptionSchema],
    required: true,
    validate: [arrayLimit, 'At least one prescription is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', medicalRecordschema);
