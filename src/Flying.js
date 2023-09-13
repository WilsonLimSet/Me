import React from 'react';

const AviationData = () => {
  return (
    <div style={{ backgroundColor: 'black', fontSize: '18px', fontWeight: 500, color: 'white', width: '400px', height: '278px' }}>
      <a href="https://metar-taf.com/KSMO" id="metartaf-L4CZwZLO" style={{ display: 'block' }}>
        METAR Santa Monica Municipal Airport
      </a>
      <iframe
        title="METAR Santa Monica"
        src="https://metar-taf.com/KSMO"
        width="100%"
        height="100%"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default AviationData;
