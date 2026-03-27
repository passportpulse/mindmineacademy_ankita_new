const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  getApplicationByTrackingId,getApplicationByPhone
} = require("../controllers/applicationController");

// ✅ Simple POST (JSON)
router.post("/", createApplication);

router.get("/status/:trackingId",getApplicationByTrackingId);

// Admin
router.get("/phone/:phone",  adminAuth,getApplicationByPhone);
router.get("/", adminAuth, getApplications);
router.get("/:id", adminAuth, getApplicationById);
router.patch("/:id", adminAuth, updateApplication);

module.exports = router;
