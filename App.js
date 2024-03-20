import React, { useState } from 'react';
import Assests from './book.jpg';

function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div style={{ 
      backgroundImage: `url(${Assests})`, 
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "110vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <h1 style={{ marginBottom: '20px', color: 'black', textAlign: 'center', }}>Book Search</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" value={query} onChange={handleChange} placeholder="Enter book title" style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: 'none' }} />
        <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff' }}>Search</button>
      </form>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px',
        gap: '15px'
      }}>
        {books.map((book) => (
          <div key={book.id} style={{ marginBottom: '20px' }}>
            <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} style={{ width: '150px', height: '200px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;
