import React from "react";
import Hero from "./Hero";
import ApplyForm from "../../components/ApplyForm";

export default function ApplyNowPage() {
  return (
    <div style={{ position: "relative" }}>
      {/* Hero component */}
      <Hero />

      {/* ApplyForm overlapping Hero */}
      <div
        style={{
          position: "relative",
          top: "-60px", // adjust overlap height
          zIndex: 10,
          margin: "0 auto",
          width: "90%",
          maxWidth: "1000px",
          borderRadius: "15px",
          backgroundColor:"transparent",
        }}
      >
        <ApplyForm />
      </div>
    </div>
  );
}
