const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/download', async (req, res) => {
  const reelUrl = req.query.url;

  if (!reelUrl) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(`https://instagram-media-downloader.p.rapidapi.com/rapid/post.php?url=${encodeURIComponent(reelUrl)}`, {
      headers: {
        'X-RapidAPI-Host': 'instagram-media-downloader.p.rapidapi.com',
        'X-RapidAPI-Key': 'demo-key' // Replace with real key later
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Instagram media.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
