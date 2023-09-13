import React from 'react';

const AviationData = () => {
  return (
    <div style={{ backgroundColor: 'white', fontSize: '18px', fontWeight: 500, color: 'white', width: '400px', height: '278px' }}>
      <iframe
  title="METAR Santa Monica"
  src="https://metar-taf.com/embed-js/KSMO?layout=landscape&visibility=mi&qnh=inHg&rh=rh&target=p2H3ehTx"
  width="350"
  height="278"
  frameborder="0"
></iframe>

     
      
    </div>
  );
};

export default AviationData;
