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
    console.log("BODY:", req.body);

    const data = req.body;

    // ✅ Basic required validation (match frontend)
    if (!data.fullName || !data.phone || !data.email || !data.course) {
      return res.status(400).json({
        message: "Full Name, Phone, Email, Course are required",
      });
    }

    // ✅ Generate tracking ID
    const trackingId = generateTrackingId();

    // ✅ Save directly (flat structure)
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
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


exports.updateApplication = async (req, res) => {
  try {
    const { status, applicationId } = req.body;
    let updateData = { ...req.body };
    // validation
    if (status === "approved") {
      if (!applicationId) {
        return res.status(400).json({
          message: "Application ID is required for approval",
        });
      }
    }

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
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
