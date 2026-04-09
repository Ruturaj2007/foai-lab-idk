import React, { useState } from 'react';
import Card from './Card';
import { Sparkles, UserCircle } from 'lucide-react';

const RandomUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    setUser(null);
    
    try {
      const response = await fetch('https://randomuser.me/api/');
      if (!response.ok) throw new Error('Failed to reveal adventurer');
      const data = await response.json();
      setUser(data.results[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Random User Profile">
      {loading && (
        <div className="loading">
          <Sparkles size={20} />
          <span>Revealing Adventurer...</span>
        </div>
      )}
      
      {error && (
        <div className="error">{error}</div>
      )}
      
      {user && !loading && (
        <div className="adventurer-card">
          <img 
            src={user.picture.large} 
            alt="Adventurer Portrait" 
            className="adventurer-pic"
          />
          <h3 style={{ marginBottom: '1rem', color: 'var(--gold-accent)' }}>
            {user.name.title} {user.name.first} {user.name.last}
          </h3>
          <div className="adventurer-info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Country:</strong> {user.location.country}</p>
            <p><strong>Age:</strong> {user.dob.age}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        </div>
      )}
      
      {!user && !loading && !error && (
        <p style={{ color: 'var(--misty-lavender)' }}>
          Identify a new guild member.
        </p>
      )}

      <div className="action-row" style={{ marginTop: 'auto' }}>
        <button onClick={fetchUser} disabled={loading} className="btn">
          <UserCircle size={16} />
          Reveal Adventurer
        </button>
      </div>
    </Card>
  );
};

export default RandomUser;
