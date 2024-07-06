const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
const PORT = 5500;

app.use(cors());
app.use(bodyParser.json());

// Get photos with pagination
app.get('/api/photos', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const { count, rows: photos } = await db.Photo.findAndCountAll({
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });
    res.json({
      photos,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      totalPhotos: count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/photos', async (req, res) => {
  const { title, description, url } = req.body;
  try {
    const newPhoto = await db.Photo.create({ title, description, url });
    res.status(201).json(newPhoto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/photos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  try {
    const photo = await db.Photo.findByPk(id);
    if (photo) {
      await photo.update({ title, description, url });
      res.json(photo);
    } else {
      res.status(404).json({ message: 'Photo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/photos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await db.Photo.findByPk(id);
    if (photo) {
      await photo.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Photo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search endpoint
app.get('/api/photos/search', async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const photo = await db.Photo.findByPk(id);
      if (photo) {
        res.json(photo);
      } else {
        res.status(404).json({ message: 'Photo not found' });
      }
    } else {
      // If no ID is provided, return all photos with pagination
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows: photos } = await db.Photo.findAndCountAll({
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });
      res.json({
        photos,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page, 10),
        totalPhotos: count,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
