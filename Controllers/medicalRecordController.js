const MedicalRecord = require("../models/MedicalRecords");

//  1. Create New Medical Record
exports.CreateNewRecord = async (req, res) => {
    try {
        const newRecord = new MedicalRecord(req.body);
        await newRecord.save();
        res.status(201).json({ message: "Medical record created successfully", data: newRecord });
    } catch (error) {
        res.status(500).json({ message: "Error creating medical record", error });
    }
};

//  2. Get All Medical Records
exports.getAllRecords = async (req, res) => {
    try {
        const records = await MedicalRecord.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: "Error fetching records", error });
    }
};

//  3. Get Medical Record by ID
exports.getRecordById = async (req, res) => {
    try {
        const record = await MedicalRecord.findById(req.params.id);
        if (!record) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: "Error fetching record", error });
    }
};

//  4. Update Medical Record
exports.updateRecord = async (req, res) => {
    try {
        const updatedRecord = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecord) return res.status(404).json({ message: "Record not found" });
        res.status(200).json({ message: "Record updated", data: updatedRecord });
    } catch (error) {
        res.status(500).json({ message: "Error updating record", error });
    }
};
// 5.  Delete Medical Record
exports.deletedRecord = async (req, res) => {
    try {
        const deleted = await MedicalRecord.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Record not found" });
        }
        else {
            res.status(200).json({ message: "Record deleted" })
        }
    }
    catch (err) {
        res.status(500).json({ message: "Error delecting record",err })
    }
}

//  6. Manage Prescription (Add/Update)
exports.managePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const { prescriptions } = req.body;

        // Ensure prescriptions is an array before updating
        if (!Array.isArray(prescriptions) || prescriptions.length === 0) {
            return res.status(400).json({ message: "Invalid prescriptions data. It must be a non-empty array." });
        }

        const updatedRecord = await MedicalRecord.findByIdAndUpdate(
            id,
            { $set: { prescriptions } }, //  Using $set to replace the entire prescriptions array
            { new: true, runValidators: true }
        );

        if (!updatedRecord) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.status(200).json({ message: "Prescription updated", data: updatedRecord });
    } catch (error) {
        console.error("Error updating prescription:", error);
        res.status(500).json({ message: "Error updating prescription", error });
    }
};

