// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database')
const port = process.env.PORT || 3001;

let fetch;
import('node-fetch').then(({ default: fetchModule }) => {
    fetch = fetchModule;
    // Rest of your server code that uses fetch
});


// CORS options
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

// Enable CORS with options
app.use(cors(corsOptions));

// Handle pre-flight requests for all routes
app.options('*', cors(corsOptions));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
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

app.get('/api/Test-Table', async (req, res) => {
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


// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
