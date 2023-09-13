import React from 'react';

const AviationData = () => {
  return (
    <div style={{ backgroundColor: 'transparent', fontSize: '18px', fontWeight: 500, color: '#000', width: '400px', height: '278px' }}>
      <a href="https://metar-taf.com/KSMO" id="metartaf-L4CZwZLO" style={{ display: 'block' }}>
        METAR Santa Monica Municipal Airport
      </a>
      <script
        async
        defer
        crossorigin="anonymous"
        src="https://metar-taf.com/embed-js/KSMO?layout=landscape&visibility=mi&rh=rh&target=L4CZwZLO"
      ></script>
    </div>
  );
};
export default AviationData;