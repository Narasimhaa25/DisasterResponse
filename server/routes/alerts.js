// routes/alerts.js
import express from "express";
import sendSMS from '../utils/sms.js'; 
const router = express.Router();

// POST /alerts/send
router.post("/send", async (req, res) => {
  try {
    const { number, message } = req.body;

    if (!number || !message) {
      return res.status(400).json({ error: "Number and message are required" });
    }

    // ✅ FIX: Ensure the number is a string, which the API expects.
    // The axios request body in sms.js expects 'numbers' to be a string.
    // In your case, it's a single number string from the request body.
    // The current code already works for a single number but for a list of numbers
    // you would need to join them into a string.
    const formattedNumbers = Array.isArray(number) ? number.join(',') : number;

    // Call the actual SMS function
    await sendSMS(formattedNumbers, message);

    return res.json({ success: true, message: "✅ Alert sent successfully!" });
  } catch (err) {
    console.error("❌ Alert send error:", err);
    res.status(500).json({ error: "Failed to send alert", details: err.message });
  }
});

export default router;