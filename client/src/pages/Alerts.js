import React, { useState } from "react";
import "./Alerts.css";

export default function Alerts() {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [institution, setInstitution] = useState("");
  const [message, setMessage] = useState("Disaster Preparedness Alert");
  const [status, setStatus] = useState("");

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir"
  ];

  const institutions = [
    "Schools", "Colleges", "Universities", "Polytechnics", "Other"
  ];

  const sendAlert = async () => {
    try {
      setStatus("Sending alert...");

      const res = await fetch("http://localhost:5001/alerts/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: phone, state, institution, message }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Alert Response:", data);
      setStatus("✅ Alert sent successfully!");
    } catch (err) {
      console.error("❌ Error sending alert:", err);
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="alerts-container">
      <h1>📢 State & Institution Alerts</h1>
      <p>Send real-time disaster preparedness alerts to schools & colleges</p>

      <div className="form-group">
        <label>Select State</label>
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">-- Select State --</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Institution Type</label>
        <select value={institution} onChange={(e) => setInstitution(e.target.value)}>
          <option value="">-- Select Institution --</option>
          {institutions.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Phone Number (optional)</label>
        <input
          type="text"
          placeholder="Enter phone number (if specific)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button className="btn-danger" onClick={sendAlert}>
        🚨 Send Alert
      </button>

      {status && <div className="status">{status}</div>}
    </div>
  );
}