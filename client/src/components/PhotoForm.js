import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoForm = ({ existingPhoto, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (existingPhoto) {
      setTitle(existingPhoto.title);
      setDescription(existingPhoto.description);
      setUrl(existingPhoto.url);
    }
  }, [existingPhoto]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !url) {
      setError('All fields are required.');
      return;
    }

    setError('');

    const photoData = { title, description, url };

    try {
      if (existingPhoto) {
        await axios.put(`http://localhost:5500/api/photos/${existingPhoto.id}`, photoData);
      } else {
        await axios.post('http://localhost:5500/api/photos', photoData);
      }
      onSubmit();
      setTitle('');
      setDescription('');
      setUrl('');
    } catch (err) {
      setError('An error occurred while saving the photo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="url" className="form-label">URL:</label>
        <input
          type="text"
          id="url"
          className="form-control"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default PhotoForm;
