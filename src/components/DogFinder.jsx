import React, { useState } from 'react';
import Card from './Card';
import { Sparkles, Copy, PawPrint } from 'lucide-react';

const DogFinder = () => {
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Fetch random dog image from Dog API
  const fetchDog = async () => {
    setLoading(true);
    setError(null);
    setDog(null);
    setCopySuccess(false);
    
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) throw new Error('Failed to summon companion');
      const data = await response.json();
      
      // Parse breed name from URL
      // URL format: https://images.dog.ceo/breeds/hound-afghan/n02085465_1082.jpg
      const urlParts = data.message.split('/');
      let breedRaw = urlParts[4] || 'Unknown';
      const breed = breedRaw.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).reverse().join(' ');
      
      setDog({ url: data.message, breed });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = () => {
    if (dog?.url) {
      navigator.clipboard.writeText(dog.url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <Card title="Dog Finder">
      {loading && (
        <div className="loading">
          <Sparkles size={20} />
          <span>Summoning...</span>
        </div>
      )}
      
      {error && (
        <div className="error">{error}</div>
      )}
      
      {dog && !loading && (
        <>
          <img src={dog.url} alt="Random Dog" className="dog-image" />
          <h4 style={{ marginBottom: '1rem', color: 'var(--misty-lavender)' }}>{dog.breed}</h4>
        </>
      )}

      <div className="action-row" style={{ marginTop: dog ? 'auto' : '1rem' }}>
        <button onClick={fetchDog} disabled={loading} className="btn" title="Summon Companion">
          <PawPrint size={16} />
          {dog ? 'Summon Another' : 'Summon Companion'}
        </button>
        
        {dog && (
          <button onClick={copyUrl} className="btn" title="Copy Image URL">
            <Copy size={16} />
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
    </Card>
  );
};

export default DogFinder;
