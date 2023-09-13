import React, { useEffect } from 'react';

const AviationData = () => {
  
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    
    // Set the script's properties
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.src = 'https://metar-taf.com/embed-js/KSMO?layout=landscape&visibility=mi&qnh=inHg&rh=rh&target=4QVn8PNw';

    // Append the script to the document's body
    document.body.appendChild(script);
    
    // Cleanup function: remove the script when component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []); // The empty array means this useEffect will run once when the component mounts

  return (
    <a href="https://metar-taf.com/KSMO" 
       id="metartaf-4QVn8PNw" 
       style={{ fontSize: '14px', fontWeight: '250', color: '#000', width: '350px', height: '225px', display: 'block' }}>
      METAR Santa Monica Municipal Airport
    </a>
  );
};

export default AviationData;