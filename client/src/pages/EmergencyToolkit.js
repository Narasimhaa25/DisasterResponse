import React from "react";
import { Phone, AlertTriangle, Activity, Droplet, Flame } from "lucide-react";
import "./EmergencyToolkit.css";

export default function EmergencyToolkit() {
  return (
    <div className="toolkit-container">
      <h1>🛑 Emergency Toolkit</h1>
      <p className="subtitle">
        Quick access to SOS, emergency contacts, and step-by-step safety guidance
      </p>

      {/* SOS Section */}
      <div className="toolkit-section sos">
        <h2><AlertTriangle size={20} /> SOS</h2>
        <p>Call emergency number immediately.</p>
        <a href="tel:112" className="btn btn-sos">📞 Call 112</a>
      </div>

      {/* Contacts Section */}
      <div className="toolkit-section contacts">
        <h2><Phone size={20} /> Emergency Contacts</h2>
        <ul>
          <li><strong>🔥 Fire:</strong> <a href="tel:101">101</a></li>
          <li><strong>🚑 Ambulance:</strong> <a href="tel:102">102</a></li>
          <li><strong>🌍 Disaster Management:</strong> <a href="tel:108">108</a></li>
        </ul>
      </div>

      {/* Step-by-Step Guidance */}
      <div className="toolkit-section guidance">
        <h2><Activity size={20} /> Step-by-step Guidance</h2>
        <ul>
          <li><strong><Activity size={16} /> Earthquake:</strong> Drop, Cover, and Hold On.</li>
          <li><strong><Droplet size={16} /> Flood:</strong> Move to higher ground, avoid running water.</li>
          <li><strong><Flame size={16} /> Fire:</strong> Evacuate, stay low, use stairs not elevators.</li>
        </ul>
      </div>

      {/* Preparedness Tips */}
      <div className="toolkit-section tips">
        <h2>💡 Preparedness Tips</h2>
        <ul>
          <li>Keep a first-aid kit, flashlight, and whistle handy.</li>
          <li>Store emergency water and food supplies for at least 72 hours.</li>
          <li>Know your local evacuation routes and safe zones.</li>
          <li>Save emergency contacts in your phone with labels.</li>
        </ul>
      </div>
    </div>
  );
}