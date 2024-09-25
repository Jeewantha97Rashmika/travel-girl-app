import React from "react";

export default function SosButton({
  handleShareLocation
}) {
  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)", // Gradient color
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.15)", // Shadow effect
    color: "white",
    fontSize: "48px",
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    border: "none",
    outline: "none",
    cursor: "pointer",
    margin: "50px auto", // Centering the button
  };

  const subTextStyle = {
    position: "absolute",
    bottom: "40px",
    fontSize: "14px",
    fontWeight: "normal",
  };
  return (
    <div style={buttonStyle} onClick={handleShareLocation}>
      <div>SOS</div>
      <div style={subTextStyle}>Press 3 for second</div>
    </div>
  );
}
