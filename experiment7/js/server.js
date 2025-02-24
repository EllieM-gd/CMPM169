const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow all origins

let username = "magikshrooms"

function updateUsername() {
    username = document.getElementById("uname").value;
    console.log("New Username: " + username);
}


app.get('/api/player', async (req, res) => {
    try {
        console.log("https://marvelrivalsapi.com/api/v1/player/" + username);
        const response = await axios.get("https://marvelrivalsapi.com/api/v1/player/" + username, {
            headers: { 'x-api-key': '0a84947c0da43f684863940c98982a8eb7cf4f16697f17857ccc33ae2a54beb5' }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));