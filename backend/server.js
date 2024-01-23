// server.js
require('dotenv').config();
const express = require('express');
const db = require('./database')

let fetch;
import('node-fetch').then(({ default: fetchModule }) => {
    fetch = fetchModule;
    // Rest of your server code that uses fetch
});

const app = express();
const port = process.env.PORT || 3001;

// Allow CORS (Cross-Origin Resource Sharing) for your frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

async function getAllFromTestTable() {
    try {
        // Replace "Test-Table" with the actual name of your table
        const result = await db.query('SELECT * FROM "Test-Table"');
        return result.rows;
    } catch (err) {
        console.error('Error fetching data from Test-Table:', err);
        throw err; // Or handle it as needed
    }
}

app.get('/test-table', async (req, res) => {
    try {
        const data = await getAllFromTestTable();
        res.json(data);
    } catch (err) {
        res.status(500).send('Error retrieving data');
    }
});


app.get('/aqi', async (req, res) => {
    const city = req.query.city;

    // Construct API URL
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?contentType=json&unitGroup=metric&key=${process.env.VISUAL_CROSSING_API_KEY}&elements=datetime,aqius`;

    // Log the URL being requested
    console.log("Requesting URL:", apiUrl);

    try {
        const apiResponse = await fetch(apiUrl);

        // If response is ok, log and send the data, otherwise log error
        if (apiResponse.ok) {
            const apiData = await apiResponse.json();
            console.log("API Response Data:", apiData);
            res.json(apiData.currentConditions.aqius);
        } else {
            console.error("API Response Error:", apiResponse.status, apiResponse.statusText);
            res.status(apiResponse.status).json({ error: apiResponse.statusText });
        }

    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
