const Enquiry = require("../models/Enquiry");

exports.createEnquiry = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      lastQualification,
      courseEnquiry,
      message,
    } = req.body;

    // ✅ Required fields check
    const requiredFields = {
      fullName,
      phone,
      email,
      lastQualification,
      courseEnquiry,
      message,
    };

    for (let key in requiredFields) {
      if (!requiredFields[key]) {
        return res.status(400).json({
          message: `${key} is required`,
        });
      }
    }

    // ✅ Full name validation
    if (fullName.trim().length < 3) {
      return res.status(400).json({
        message: "Full name must be at least 3 characters",
      });
    }

    // ✅ Phone validation
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone must be 10 digits",
      });
    }

    // ✅ Email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // ✅ Message validation
    if (message.length < 5 || message.length > 500) {
      return res.status(400).json({
        message: "Message must be between 5 and 500 characters",
      });
    }

    // ✅ Prevent spam duplicate (same phone within short time)
    const existing = await Enquiry.findOne({
      phone,
      createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }, // last 5 mins
    });

    if (existing) {
      return res.status(429).json({
        message: "You already submitted recently. Please wait.",
      });
    }

    // ✅ Save enquiry
    const enquiry = await Enquiry.create({
      fullName: fullName.trim(),
      phone,
      email: email.toLowerCase(),
      lastQualification,
      courseCategory: courseEnquiry,
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};


exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .select("-__v"); // remove unnecessary field

    res.json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
