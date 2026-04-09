import React, { useState } from 'react';
import Card from './Card';
import { Sparkles, ScrollText } from 'lucide-react';

const JokeGenerator = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    setJoke(null);
    
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) throw new Error('Failed to decipher the scroll');
      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Joke Generator">
      {loading && (
        <div className="loading">
          <Sparkles size={20} />
          <span>Decoding ancient wisdom...</span>
        </div>
      )}
      
      {error && (
        <div className="error">{error}</div>
      )}
      
      {joke && !loading && (
        <div className="scroll-entry">
          <p className="joke-setup">{joke.setup}</p>
          <p className="joke-punchline">{joke.punchline}</p>
        </div>
      )}
      
      {!joke && !loading && !error && (
        <p style={{ color: 'var(--misty-lavender)' }}>
          Seek wisdom from the ancient scrolls.
        </p>
      )}

      <div className="action-row" style={{ marginTop: 'auto' }}>
        <button onClick={fetchJoke} disabled={loading} className="btn">
          <ScrollText size={16} />
          {joke ? 'Next Scroll' : 'Ancient Wisdom'}
        </button>
      </div>
    </Card>
  );
};

export default JokeGenerator;
