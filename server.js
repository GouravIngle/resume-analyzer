const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") }); 

const { analyzeResume } = require("./server/groq");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./public")));

app.post("/analyze", async (req, res) => {
  const { resumeText } = req.body;
  const analysis = await analyzeResume(resumeText);
  res.json({ analysis });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
