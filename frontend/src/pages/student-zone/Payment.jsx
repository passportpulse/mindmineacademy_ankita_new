import React from "react";
import "../../styles/student-zone/payment.css";
// import axios from "axios";

export default function Payment() {
  // const handlePayment = async () => {
  //   try {
  //     // 1. Create order from backend
  //     const amountToPay = 1; // for example, ₹5000
  //     const { data } = await axios.post(
  //       "http://localhost:5000/api/payment/create-order",
  //       { amount: amountToPay * 100 }, // convert to paise
  //     );

  //     // 2. Open Razorpay checkout with UPI/QR option
  //     const options = {
  //       key: "rzp_test_SATmAadW0FHGV0",
  //       amount: data.amount,
  //       currency: "INR",
  //       name: "MindMine Academy",
  //       description: "Course Payment",
  //       order_id: data.id,
  //       prefill: { email: "student@example.com" },
  //       theme: { color: "#0d6efd" },

  //       method: {
  //         upi: true, // ✅ UPI / QR
  //         card: true, // ✅ cards
  //         netbanking: true, // ✅ netbanking
  //         wallet: true, // ✅ wallets
  //       },

  //       // handler called after successful payment
  //       handler: async (response) => {
  //         await axios.post(
  //           "https://mindmine-academy-ankita.onrender.com/api/enquiry/payment/verify",
  //           response,
  //         );
  //         alert("Payment successful 🎉");
  //       },
  //     };

  //     const razorpay = new window.Razorpay(options);
  //     razorpay.open();
  //   } catch (err) {
  //     console.error(err);
  //     alert("Payment failed");
  //   }
  // };

  return (
    <>
      <section className="payment-section">
        <div className="payment-card">
          <h2>Payment</h2>
          <p>Make your tuition and course payments securely online.</p>

          {/* <button className="payment-btn" onClick={handlePayment}> */}
          <button className="payment-btn">Pay Now</button>
        </div>
      </section>
    </>
  );
}
