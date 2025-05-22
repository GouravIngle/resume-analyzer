const axios = require("axios");
require("dotenv").config();
console.log("Groq key loaded:", process.env.GROQ_API_KEY); 

const analyzeResume = async (resumeText) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://api.groq.com/openai/v1/chat/completions",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are an expert resume reviewer. Provide detailed, structured feedback for the following resume text.",
          },
          {
            role: "user",
            content: resumeText,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    return "Failed to analyze resume. Please try again later.";
  }
};

module.exports = { analyzeResume };
