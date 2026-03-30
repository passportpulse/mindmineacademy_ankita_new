const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth"); // ✅ FIXED

const {
  createEnquiry,
  getAllEnquiries,updateEnquiryStatus,
} = require("../controllers/enquiryController");

// Routes
router.post("/", createEnquiry);          // Public (form submit)
router.get("/", adminAuth, getAllEnquiries); // Protected (admin)
// ✅ NEW ROUTE
router.patch("/:id/status", (req, res, next) => {
    updateEnquiryStatus(req, res, next);
});
module.exports = router;
