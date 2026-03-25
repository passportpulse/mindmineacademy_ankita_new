import React from "react";

export default function MapEmbed() {
  return (
    <div className="container">
      <div
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom:'4rem',
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.890093605876!2d87.97282731546333!3d22.685552085121053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8758e9b5d09f1%3A0x4b7b8c7087b8a8c4!2sMaharaja%20Agrasain%20Dham%2C%20Bagnan!5e0!3m2!1sen!2sin!4v1706264212192!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      </div>
    </div>
  );
}
