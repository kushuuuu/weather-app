import React from "react";

const Contact = () => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    textAlign: "center"
  }}>
    <h1>Contact</h1>
    <form style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "400px" }}>
      <input type="text" placeholder="Name" style={{ padding: "0.5rem" }} />
      <input type="email" placeholder="Email" style={{ padding: "0.5rem" }} />
      <textarea placeholder="Message" rows="4" style={{ padding: "0.5rem" }} />
      <button type="submit" style={{
        padding: "0.5rem",
        backgroundColor: "#1e90ff",
        color: "white",
        border: "none",
        borderRadius: "4px"
      }}>
        Send
      </button>
    </form>
  </div>
);

export default Contact;
