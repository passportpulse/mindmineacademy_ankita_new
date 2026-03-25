const Enquiry = require("../models/Enquiry");

// CREATE enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      lastQualification,
      courseEnquiry, // coming from frontend
      message,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !email ||
      !lastQualification ||
      !courseEnquiry ||
      !message
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const enquiry = new Enquiry({
      fullName,
      phone,
      email,
      lastQualification,

      // ✅ MAP HERE
      courseCategory: courseEnquiry,

      message,
    });

    await enquiry.save();

    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET all enquiries (Admin)
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
