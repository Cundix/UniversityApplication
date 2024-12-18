require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

// Load Gemini API Key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

app.post('/generate-application', async (req, res) => {
    const { prompt } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ applicationText: text });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to generate application.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
