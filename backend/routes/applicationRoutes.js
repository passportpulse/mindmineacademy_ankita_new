const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  getApplicationByTrackingId,
  getApplicationByPhone,

  // EMI
  addEmi,
  updateEmi,
  deleteEmi,

  // Payment
  addPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/applicationController");

//////////////////////////////////////////////////////
// PUBLIC ROUTES
//////////////////////////////////////////////////////

// Create Application
router.post("/", createApplication);

// Track by ID
router.get("/status/:trackingId", getApplicationByTrackingId);

//////////////////////////////////////////////////////
// ADMIN ROUTES
//////////////////////////////////////////////////////

// Search by phone
router.get("/phone/:phone", adminAuth, getApplicationByPhone);

// Get all
router.get("/", adminAuth, getApplications);

// Get single
router.get("/:id", adminAuth, getApplicationById);

// Update application (status, fees etc.)
router.patch("/:id", adminAuth, updateApplication);

//////////////////////////////////////////////////////
// EMI ROUTES
//////////////////////////////////////////////////////

// Add EMI
router.post("/:id/emi", adminAuth, addEmi);

// Update EMI
router.patch("/:id/emi/:emiId", adminAuth, updateEmi);

// Delete EMI
router.delete("/:id/emi/:emiId", adminAuth, deleteEmi);

//////////////////////////////////////////////////////
// PAYMENT ROUTES
//////////////////////////////////////////////////////

// Add payment (down payment OR EMI payment)
router.post("/:id/payment", adminAuth, addPayment);

// Update payment
router.patch("/:id/payment/:paymentId", adminAuth, updatePayment);

// Delete payment
router.delete("/:id/payment/:paymentId", adminAuth, deletePayment);

//////////////////////////////////////////////////////

module.exports = router;
