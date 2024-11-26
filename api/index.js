
const express = require('express');
const axios = require('axios'); // Tambahkan axios
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/download', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL tidak diberikan' });
  }

  try {
    const apiUrl = `https://ssstik.io/abc?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl); // Menggunakan GET request ke API

    const data = response.data;

    if (data.status) {
      return res.json({
        creator: "herza",
        msg: "success",
        status: true,
        data: {
          author: data.data.author,
          title: data.data.title,
          video_url: data.data.video,
          audio_url: data.data.audio,
          view: data.data.view,
          comment: data.data.comment,
          share: data.data.share,
          play: data.data.play,
          duration: data.data.duration,
        }
      });
    } else {
      return res.status(400).json({
        status: false,
        error: 'Gagal mendapatkan data TikTok',
        msg: "error mas"
      });
    }
  } catch (error) {
    console.error('Error fetching data from ssstik.io:', error); // Log error ke konsol
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
