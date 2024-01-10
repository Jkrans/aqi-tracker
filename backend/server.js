// server.js
require('dotenv').config();
const express = require('express');

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


app.get('/aqi', async (req, res) => {
    return res.json({ test: "This is a test response" });
    // Get city from the query string
    // const city = req.query.city;

    // // Construct API URL
    // const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?contentType=json&unitGroup=metric&key=${process.env.VISUAL_CROSSING_API_KEY}&elements=datetime,aqius`;

    // try {
    //     const apiResponse = await fetch(apiUrl);
    //     const apiData = await apiResponse.json();
    //     res.json(apiData.currentConditions.aqius);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
