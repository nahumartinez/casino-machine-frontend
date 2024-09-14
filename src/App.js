import React, { useState } from 'react';
import './App.css';

function App() {
  const [symbols, setSymbols] = useState(['?', '?', '?']);
  const [isWinner, setIsWinner] = useState(false);
  const [isLeverPulled, setIsLeverPulled] = useState(false);

  const handleSpin = async () => {
    setIsLeverPulled(true); 

    setTimeout(async () => {
      const response = await fetch('http://localhost:5000/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      setSymbols(result.symbols);
      setIsWinner(result.isWinner);

      setIsLeverPulled(false); 
    }, 1000);
  };

  return (
    <div className="machine-container">
      <div className="machine">
        <div className="symbols">
          {symbols.map((symbol, index) => (
            <div key={index} className="symbol">
              {symbol}
            </div>
          ))}
        </div>

        <div
          className={`lever ${isLeverPulled ? 'pulled' : ''}`} 
          onClick={handleSpin} 
        >
          <div className="lever-handle"></div>
        </div>

        {symbols[0] !== '?' && (
          <div className={`message ${isWinner ? '' : 'lose'}`}>
            {isWinner ? '¡Ganaste!' : '¡Perdiste!'}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;