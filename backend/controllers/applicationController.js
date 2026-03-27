const Application = require("../models/Application");
// 🔹 Function to generate tracking ID
const generateTrackingId = () => {
  const random = Math.floor(100 + Math.random() * 900); // 3 digits
  const timestamp = Date.now().toString().slice(-4); // last 4 digits of time
  // Format: MMI-629387-2846 (Similar to your requested format)
  return `MMI-${Math.floor(100000 + Math.random() * 899999)}-${random}${timestamp.slice(-1)}`;
};

exports.createApplication = async (req, res) => {
  try {
    const data = req.body;

    // ✅ Required fields check
    const requiredFields = [
      "fullName",
      "phone",
      "email",
      "course",
      "campus",
      "dob",
      "gender",
      "address",
      "city",
      "state",
      "lastQualification",
      "fatherName",
    ];

    for (let field of requiredFields) {
      if (!data[field]) {
        return res.status(400).json({
          message: `${field} is required`,
        });
      }
    }

    // ✅ Phone validation
    if (!/^\d{10}$/.test(data.phone)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    // ✅ Email validation
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // ✅ Aadhaar validation (if provided)
    if (data.aadhaar && !/^\d{12}$/.test(data.aadhaar)) {
      return res.status(400).json({ message: "Invalid Aadhaar number" });
    }

    // ✅ Generate tracking ID
    const trackingId = generateTrackingId();

    const application = await Application.create({
      trackingId,
      ...data,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      trackingId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.updateApplication = async (req, res) => {
  try {
    const { status, applicationId } = req.body;

    // ✅ Only allow specific fields to update
    const allowedUpdates = ["status", "applicationId", "fees"];
    const updates = {};

    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // ✅ Status validation
    if (status && !["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    // ✅ Approval requires applicationId
    if (status === "approved" && !applicationId) {
      return res.status(400).json({
        message: "Application ID is required for approval",
      });
    }

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true, // 🔥 IMPORTANT
      }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All Applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Application
exports.getApplicationById = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ success: true, data: app });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Application by Tracking ID (Public)
exports.getApplicationByTrackingId = async (req, res) => {
  try {
    const { trackingId } = req.params;

    // Look for the trackingId in the database
    const application = await Application.findOne({ trackingId });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "No application found with this Tracking ID.",
      });
    }

    // Return the data
    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching status.",
    });
  }
};
// Get Application by Phone Number (Public)
exports.getApplicationByPhone = async (req, res) => {
  try {
    const phone = req.params.phone.trim();

    console.log("Searching for:", phone);

    const applications = await Application.find({
      phone: phone,
    });

    console.log("Found:", applications);

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No application found with this phone number.",
      });
    }

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

