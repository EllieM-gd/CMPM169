const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow all origins

let apiKey = '0a84947c0da43f684863940c98982a8eb7cf4f16697f17857ccc33ae2a54beb5';
let username = "Ahri Enjoyer"

function _updateUsername() {
    username = document.getElementById("uname").value;
    console.log("New Username: " + username);
}


app.get('/api/player', async (req, res) => {
    try {
        console.log("https://marvelrivalsapi.com/api/v1/player/" + username);
        const response = await axios.get("https://marvelrivalsapi.com/api/v1/player/" + username + "?season=1", {
            headers: { 'x-api-key': apiKey }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});

app.get('/api/update', async (req, res) => {
    try {
        const response = await axios.get("https://marvelrivalsapi.com/api/v1/player/" + username + "/update", {
            headers: { 'x-api-key': apiKey }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});

//Get an image from the API
app.get('/api/image', async (req, res) => {
    try {
        const response = await axios.get("https://marvelrivalsapi.com/api/v1" + req.query.url, {
            headers: { 'x-api-key': apiKey }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
}
);



app.listen(3000, () => console.log('Server running on port 3000'));