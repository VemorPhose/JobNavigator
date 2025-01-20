const express = require('express');
const multer = require('multer');
const convertPdfToText = require('./scripts/pdf_to_txt.cjs');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/convert', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const textResult = await convertPdfToText(req.file.buffer);
    res.send(textResult);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));