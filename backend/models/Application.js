const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    trackingId: { type: String, unique: true },

    // Campus
    campus: String,
    campusLocation: String,
    course: String,

    // Student
    fullName: { type: String, required: true },
    dob: String,
    gender: String,
    caste: String,
    aadhaar: String,
    address: String,
    city: String,
    state: String,
    pin: String,
    phone: { type: String, required: true },
    email: { type: String, required: true },

    // Parents
    fatherName: String,
    fatherOccupation: String,
    fatherPhone: String,
    motherName: String,
    motherOccupation: String,
    motherPhone: String,

    // Guardian
    guardianName: String,
    guardianRelation: String,
    guardianPhone: String,

    // Academic
    lastQualification: String,
    passingYear: String,
    previousCourse: String,
    previousInstitute: String,
    percentage: String,

    // Status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
