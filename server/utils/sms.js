// utils/sms.js
import axios from "axios";

const sendSMS = async (numbers, message) => {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",  // ✅ Changed the route to 'q' for Quick SMS
        message: message,
        language: "english",
        flash: 0,
        numbers: numbers,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
        },
      }
    );
    console.log("✅ SMS Sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error sending SMS:", error.response?.data || error.message);
    throw error;
  }
};

export default sendSMS;