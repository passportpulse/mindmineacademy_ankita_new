const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    trackingId: { type: String, unique: true },

    // Campus
    campus: {
      type: String,
      required: [true, "Campus is required"],
      trim: true,
    },
    course: {
      type: String,
      required: [true, "Course is required"],
    },

    // Student
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 3,
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    caste: String,

    aadhaar: {
      type: String,
      match: [/^\d{12}$/, "Aadhaar must be 12 digits"],
    },

    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pin: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "PIN must be 6 digits"],
    },

    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Phone must be 10 digits"],
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    // Parents
    fatherName: { type: String, required: true },
    fatherPhone: {
      type: String,
      match: [/^\d{10}$/, "Invalid father phone"],
    },
    fatherOccupation: { type: String },

    motherName: { type: String },
    motherPhone: {
      type: String,
      match: [/^\d{10}$/, "Invalid mother phone"],
    },
    motherOccupation: { type: String },

    guardianName: { type: String },
    guardianRelation: {
      type: String,
    },
    guardianPhone: { type: String },

    // Academic
    lastQualification: { type: String, required: true },
    passingYear: {
      type: String,
      match: [/^\d{4}$/, "Year must be 4 digits"],
    },
    previousCourse: { type: String },
    previousInstitute: { type: String },
    percentage: {
      type: Number,
      min: 0,
      max: 100,
    },

    // Status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    // ✅ ADD THESE TWO FIELDS
    applicationId: {
      type: String,
      unique: true, // optional but recommended
      sparse: true, // prevents unique error when null
    },

    fees: {
      type: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Application", applicationSchema);
