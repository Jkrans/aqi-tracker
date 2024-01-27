// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database')
const port = process.env.PORT || 3001;
app.use(express.json());

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


app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

// Check if user exists
const checkIfUserExists = async (email) => {
    const result = await db.query('SELECT * FROM UserAlertPreferences WHERE email = $1', [email]);
    return result.rowCount > 0;
};


// const insertNewUser = async (email) => {
//     const queryText = `
//         INSERT INTO UserAlertPreferences (email)
//         VALUES ($1)
//         RETURNING *;`;

//     try {
//         const result = await db.query(queryText, [email, userName, phoneNumber, aqiThreshold]);
//         return result.rows[0]; // Assuming you want to return the newly created user
//     } catch (err) {
//         console.error('Error inserting new user:', err);
//         throw err;
//     }
// }

app.post('/api/user', async (req, res) => {
    const { email } = req.body;
    try {
        // Check if user exists and handle accordingly
        const userExists = await checkIfUserExists(email);
        if (!userExists) {
            // const newUser = await insertNewUser(email);
            // console.log("New user created:", newUser);
        }
        // Return appropriate response
        res.json({ message: 'User checked/created', userExists });
    } catch (err) {
        console.error('Error in /api/user route:', err);
        res.status(500).json({ error: 'Error handling user data', details: err.message });
    }
});


app.get('/api/test', async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM test");
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
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
