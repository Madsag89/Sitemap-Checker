const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5502;

app.use(cors()); // Use CORS to handle cross-origin requests

app.get('/fetch-sitemap', async (req, res) => {
    const { url } = req.query;
    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching the sitemap:', error);
        res.status(500).send('Error fetching the sitemap');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});