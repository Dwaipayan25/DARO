import React from 'react';
import './Hero1.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h1 className="hero-title">Unlocking the Infinite Frontiers:</h1>
        <h2 className="hero-subtitle">Filecoin-Powered DARO</h2>
        <h3 className="hero-subtitle">Where Research Takes Flight!</h3>
      </div>
      <div className="hero-right">
        <div className="hero-buttons">
          <button className="hero-button">Publish a Research</button>
          <button className="hero-button">Review a Research</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
