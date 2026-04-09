import React, { useState } from 'react';
import Card from './Card';
import { Sparkles, Library, FileText, MessageCircle, Image, ImagePlus } from 'lucide-react';

const JsonExplorer = () => {
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (type) => {
    setLoading(true);
    setError(null);
    setData([]);
    setDataType(type);
    
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/${type}?_limit=5`);
      if (!response.ok) throw new Error(`Failed to fetch ${type}`);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="JSONPlaceholder Explorer">
      {loading && (
        <div className="loading">
          <Sparkles size={20} />
          <span>Searching the archives...</span>
        </div>
      )}
      
      {error && (
        <div className="error">{error}</div>
      )}

      {data.length > 0 && !loading && (
        <div className="list-container">
          <h3 style={{ marginBottom: '1rem', color: 'var(--gold-accent)', textTransform: 'capitalize' }}>
            Latest {dataType}
          </h3>
          {data.map((item) => (
            <div key={item.id} className="list-item">
              <h4>{item.title || item.name}</h4>
              <p>{item.body || item.email || (item.url && 'Image attachment...')}</p>
            </div>
          ))}
        </div>
      )}
      
      {data.length === 0 && !loading && !error && (
        <p style={{ color: 'var(--misty-lavender)' }}>
          Select a tome from the grand library.
        </p>
      )}

      <div className="btn-group" style={{ marginTop: '1.5rem' }}>
        <button onClick={() => fetchData('posts')} disabled={loading} className="btn">
          <FileText size={16} /> Posts
        </button>
        <button onClick={() => fetchData('comments')} disabled={loading} className="btn">
          <MessageCircle size={16} /> Comments
        </button>
        <button onClick={() => fetchData('albums')} disabled={loading} className="btn">
          <Library size={16} /> Albums
        </button>
        <button onClick={() => fetchData('photos')} disabled={loading} className="btn">
          <ImagePlus size={16} /> Photos
        </button>
      </div>
    </Card>
  );
};

export default JsonExplorer;
