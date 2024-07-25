import logo from './logo.svg';
import PlayerCard from './components/playercard';
import React from 'react';
import { squads } from './data/squads';
import './App.css';

function App() {
  return (
    <div>
      <header style={{backgroundImage: "url(./images/pitch.jpg)"}}>
      <h2>up the footy</h2>
      </header>
      <body>
        {squads[0].players.map(
          player => <PlayerCard seasonId={squads[0].seasonId} 
          player={player} 
          />)}
      </body>
    </div>
  );
}

export default App;
