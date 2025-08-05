// Import necessary modules
const express = require('express');
const dotenv = require('dotenv'); // Used for local development to load .env, Render handles it differently
const cors = require('cors');
const fetch = require('node-fetch'); // For making HTTP requests from Node.js

// Load environment variables from .env file for local testing
// On Render, environment variables are set directly in the dashboard.
dotenv.config();

// Create an Express application
const app = express();
// Render will provide a PORT environment variable, otherwise default to 3000
const port = process.env.PORT || 3000;

// Middleware
// Enable CORS for all origins. In production, consider restricting to your frontend's domain.
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// API Key from environment variables (accessed via process.env)
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Route to handle content generation requests
app.post('/generate-content', async (req, res) => {
    // Check if API key is available (should be set on Render)
    if (!OPENROUTER_API_KEY) {
        console.error('SERVER ERROR: OPENROUTER_API_KEY is not set in environment variables.');
        return res.status(500).json({ error: 'Server configuration error: API key not set.' });
    }

    // Extract prompt from the request body sent by the frontend
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    try {
        // Make the request to the OpenRouter API from the backend
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${OPENROUTER_API_KEY}`, // API key is used here, on the server
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-v3-0324:free", // Using a free model from OpenRouter
                messages: [{ role: "user", content: prompt }],
                max_tokens: 500, // Limit response length to control costs/free tier usage
                temperature: 0.7 // Controls randomness of the output
            })
        });

        if (!response.ok) {
            // Forward the error status and message from the external API
            const errorText = await response.text();
            console.error(`Error from OpenRouter API: ${response.status} - ${errorText}`);
            return res.status(response.status).json({ error: `External API error: ${errorText}` });
        }

        const data = await response.json();
        // Send the content back to the frontend
        res.json({ content: data.choices?.[0]?.message?.content || "No content returned." });

    } catch (error) {
        console.error('Error during content generation:', error);
        res.status(500).json({ error: 'Failed to generate content due to server error.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
});
