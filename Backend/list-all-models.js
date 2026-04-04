import axios from 'axios';
import "dotenv/config";

async function listAllModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
  
  try {
    console.log("Listing available models for this API key...");
    const response = await axios.get(url);
    console.log("✅ Success! Available models:");
    response.data.models.forEach(m => console.log(` - ${m.name}`));
  } catch (error) {
    if (error.response) {
      console.error("❌ API Error:", error.response.status, JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("❌ API Error:", error.message);
    }
  }
}

listAllModels();
