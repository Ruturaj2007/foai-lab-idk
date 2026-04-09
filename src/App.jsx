import React from 'react';
import DogFinder from './components/DogFinder';
import JokeGenerator from './components/JokeGenerator';
import RandomUser from './components/RandomUser';
import JsonExplorer from './components/JsonExplorer';
import { BookOpen } from 'lucide-react';
import './index.css';

function App() {
  return (
    <>
      <h1 className="title">
        <BookOpen style={{ display: 'inline-block', marginRight: '15px', color: 'var(--gold-accent)' }} size={40} />
        Public API Playground
      </h1>
      
      <div className="grid">
        <DogFinder />
        <JokeGenerator />
        <RandomUser />
        <JsonExplorer />
      </div>
    </>
  );
}

export default App;
