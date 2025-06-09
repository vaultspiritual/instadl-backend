const express = require('express');
const cors = require('cors');
const { getInfo } = require('instagram-url-direct');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    try {
        const result = await getInfo(url);
        res.json({ videoUrl: result.url_list[0] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
