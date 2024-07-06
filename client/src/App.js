import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoForm from './components/PhotoForm';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(6); 
  useEffect(() => {
    fetchPhotos();
  }, [currentPage]);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:5500/api/photos', {
        params: { page: currentPage, limit }
      });
      setPhotos(response.data.photos);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError('Error fetching photos.');
    }
  };

  const handlePhotoSubmit = () => {
    fetchPhotos();
    setCurrentPhoto(null);
  };

  const handleEdit = (photo) => {
    setCurrentPhoto(photo);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/api/photos/${id}`);
      fetchPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      if (searchId) {

        const response = await axios.get('http://localhost:5500/api/photos/search', {
          params: { id: searchId }
        });
        setPhotos([response.data]);  // Show only the found photo
        setTotalPages(1);
        setCurrentPage(1);
      } else {
        // If no ID is provided, fetch all photos
        fetchPhotos();
      }
    } catch (error) {
      console.error('Error searching for photo:', error);
      setError('Photo not found.');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Photo Manager</h1>

      {/* Search Form */}
      <div className="mb-4">
        <form onSubmit={handleSearchSubmit} className="d-flex flex-column gap-3 mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Photo ID (Leave empty to show all photos)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
          {error && <p className="text-danger">{error}</p>}
        </form>
      </div>

      <PhotoForm existingPhoto={currentPhoto} onSubmit={handlePhotoSubmit} />

      <h2 className="mt-5 mb-4">Photos</h2>
      <ul className="list-group">
        {photos && photos.map((photo) => (
          <li key={photo.id} className="list-group-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src={photo.url}
                alt={photo.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200'; // Fallback image
                }}
                className="img-thumbnail me-3"
                style={{ maxWidth: '100px' }}
              />
              <div>
                <h5 className="mb-1">{photo.title}</h5>
                <p className="mb-0">{photo.description}</p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleEdit(photo)}
                className="btn btn-warning me-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(photo.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
