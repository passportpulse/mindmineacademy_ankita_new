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
    const { status } = req.query;

    let filter = {};
    if (status) {
      filter.status = status;
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });

    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE STATUS
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.json({ message: "Status updated", enquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};