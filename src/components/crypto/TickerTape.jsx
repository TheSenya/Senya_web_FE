import React, { useEffect, useState } from 'react';
import './TickerTape.css';

const TickerTape = () => {
  const [prices, setPrices] = useState([
    { symbol: 'BTC', price: '0.00', change: '0.00' },
    { symbol: 'ETH', price: '0.00', change: '0.00' },
    { symbol: 'BNB', price: '0.00', change: '0.00' },
    { symbol: 'SOL', price: '0.00', change: '0.00' },
  ]);

  useEffect(() => {
    // Calculate spacing only once when component mounts
    const tickerContent = document.querySelector('.ticker-tape-content');
    const tickerContainer = document.querySelector('.ticker-tape');
    
    if (tickerContent && tickerContainer) {
      const containerWidth = tickerContainer.offsetWidth;
      const itemCount = prices.length;
      const spacing = Math.max(40, containerWidth / (itemCount * 2)); // Minimum 40px spacing
      
      // Apply constant spacing to items
      const items = document.querySelectorAll('.ticker-item');
      items.forEach(item => {
        item.style.marginRight = `${spacing}px`;
      });

      // Set constant animation duration
      const contentWidth = tickerContent.offsetWidth;
      const duration = contentWidth / 50;
      tickerContent.style.animationDuration = `${duration}s`;
    }

    // Price update logic
    const updatePrices = () => {
      setPrices(prevPrices => prevPrices.map(coin => ({
        ...coin,
        price: `$${(Math.random() * 50000).toFixed(2)}`,
        change: `${(Math.random() * 10 - 5).toFixed(2)}%`
      })));
    };

    const interval = setInterval(updatePrices, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array for one-time calculation

  return (
    <div className="ticker-tape">
      <div className="ticker-tape-content">
        {/* Original set of items */}
        {prices.map((coin, index) => (
          <div key={`original-${index}`} className="ticker-item">
            <span className="symbol">{coin.symbol}</span>
            <span className="price">{coin.price}</span>
            <span className={`change ${parseFloat(coin.change) >= 0 ? 'positive' : 'negative'}`}>
              {coin.change}
            </span>
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {prices.map((coin, index) => (
          <div key={`duplicate-${index}`} className="ticker-item">
            <span className="symbol">{coin.symbol}</span>
            <span className="price">{coin.price}</span>
            <span className={`change ${parseFloat(coin.change) >= 0 ? 'positive' : 'negative'}`}>
              {coin.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerTape;
