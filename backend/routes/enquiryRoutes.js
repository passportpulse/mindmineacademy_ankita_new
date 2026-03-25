const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth"); // ✅ FIXED

const {
  createEnquiry,
  getAllEnquiries,
} = require("../controllers/enquiryController");

// Routes
router.post("/", createEnquiry);          // Public (form submit)
router.get("/", adminAuth, getAllEnquiries); // Protected (admin)

module.exports = router;
