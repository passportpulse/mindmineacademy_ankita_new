const Application = require("../models/Application");

// 🔹 Generate Tracking ID
const generateTrackingId = () => {
  const random = Math.floor(100 + Math.random() * 900);
  const timestamp = Date.now().toString().slice(-4);

  return `MMI-${Math.floor(100000 + Math.random() * 899999)}-${random}${timestamp.slice(-1)}`;
};

// 🔥 EMI STATUS HANDLER
const updateEmiStatus = (app) => {
  const today = new Date();

  app.emis.forEach((emi) => {
    if (emi.status !== "paid") {
      if (new Date(emi.dueDate) < today) {
        emi.status = "overdue";
      } else {
        emi.status = "pending";
      }
    }
  });
};

//////////////////////////////////////////////////////
// CREATE APPLICATION
//////////////////////////////////////////////////////
exports.createApplication = async (req, res) => {
  try {
    const data = req.body;

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
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    if (!/^\d{10}$/.test(data.phone)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (data.aadhaar && !/^\d{12}$/.test(data.aadhaar)) {
      return res.status(400).json({ message: "Invalid Aadhaar number" });
    }

    const trackingId = generateTrackingId();

    const application = await Application.create({
      trackingId,
      ...data,
      payments: [],
      emis: [],
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      trackingId,
      data: application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//////////////////////////////////////////////////////
// UPDATE APPLICATION
//////////////////////////////////////////////////////
exports.updateApplication = async (req, res) => {
  try {
    const { status, applicationId } = req.body;

    const allowedUpdates = [
      "status",
      "applicationId",
      "fees",
      "emis",
      "payments",
    ];

    const updates = {};

    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    if (status && !["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    if (status === "approved" && !applicationId) {
      return res.status(400).json({
        message: "Application ID is required for approval",
      });
    }

    // 🔥 Reset on reject
    if (status === "rejected") {
      updates.fees = 0;
      updates.applicationId = "";
      updates.emis = [];
      updates.payments = [];
    }

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true },
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//////////////////////////////////////////////////////
// GET APIs
//////////////////////////////////////////////////////
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicationById = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "Not found" });

    updateEmiStatus(app);
    await app.save();

    res.json({ success: true, data: app });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicationByTrackingId = async (req, res) => {
  try {
    const application = await Application.findOne({
      trackingId: req.params.trackingId,
    });

    if (!application) {
      return res.status(404).json({ message: "No application found" });
    }

    updateEmiStatus(application);
    await application.save();

    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getApplicationByPhone = async (req, res) => {
  try {
    const phone = req.params.phone.trim();

    const applications = await Application.find({ phone });

    if (!applications.length) {
      return res.status(404).json({
        success: false,
        message: "No application found",
      });
    }

    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//////////////////////////////////////////////////////
// EMI APIs
//////////////////////////////////////////////////////

// Add EMI
exports.addEmi = async (req, res) => {
  try {
    const { amount, dueDate } = req.body;

    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "Not found" });

    app.emis.push({
      amount,
      dueDate,
      status: "pending",
    });

    updateEmiStatus(app);
    await app.save();

    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update EMI
exports.updateEmi = async (req, res) => {
  try {
    const { id, emiId } = req.params;
    const { amount, dueDate, status } = req.body;

    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ message: "Not found" });

    const emi = app.emis.id(emiId);
    if (!emi) return res.status(404).json({ message: "EMI not found" });

    if (amount) emi.amount = amount;
    if (dueDate) emi.dueDate = dueDate;
    if (status) emi.status = status;

    updateEmiStatus(app);
    await app.save();

    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete EMI
exports.deleteEmi = async (req, res) => {
  try {
    const { id, emiId } = req.params;

    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ message: "Not found" });

    app.emis = app.emis.filter((e) => e._id.toString() !== emiId);

    updateEmiStatus(app);
    await app.save();

    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//////////////////////////////////////////////////////
// PAYMENT APIs
//////////////////////////////////////////////////////

// Add Payment (Down payment + EMI payment)
exports.addPayment = async (req, res) => {
  try {
    // ✅ Required fields
    if (!amount || !method) {
      return res.status(400).json({ message: "Amount & method required" });
    }

    // ✅ NEW: Validate amount
    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // ✅ NEW: Validate method
    if (!["cash", "upi", "bank"].includes(method)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    // ✅ Existing: txnId check
    if (method !== "cash" && !txnId) {
      return res.status(400).json({ message: "Transaction ID required" });
    }

    // 👇 THEN DB CALL
    const app = await Application.findById(req.params.id);

    if (!app) return res.status(404).json({ message: "Not found" });

    app.payments.push({
      amount,
      method,
      txnId: method === "cash" ? "" : txnId,
      emiIndex,
      date: new Date(),
    });

    // Mark EMI paid
    if (emiIndex !== undefined && emiIndex >= 0 && emiIndex < app.emis.length) {
      app.emis[emiIndex].status = "paid";
    }

    updateEmiStatus(app);
    await app.save();

    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Payment
exports.deletePayment = async (req, res) => {
  try {
    const { id, paymentId } = req.params;

    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ message: "Not found" });

    const payment = app.payments.id(paymentId);

    if (payment?.emiIndex !== undefined && app.emis[payment.emiIndex]) {
      app.emis[payment.emiIndex].status = "pending";
    }

    app.payments = app.payments.filter((p) => p._id.toString() !== paymentId);

    updateEmiStatus(app);
    await app.save();

    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Payment
exports.updatePayment = async (req, res) => {
  try {
    const { id, paymentId } = req.params;
    const { amount, method, txnId } = req.body;

    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ message: "Not found" });

    const payment = app.payments.id(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    if (amount) payment.amount = amount;
    if (method) payment.method = method;
    payment.txnId = method === "cash" ? "" : txnId;

    updateEmiStatus(app);
    await app.save();

    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
