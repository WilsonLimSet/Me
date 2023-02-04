const axios = require('axios');


async function getSleepData() {
    const apiKey = process.env.REACT_APP_CLIENT_ID;
    const headers = new Headers({
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    });
  
    const response = await fetch("https://api.ouraring.com/v2/sleep", { headers });
    const data = await response.json();
  
    console.log(data);
  }
  
  export default getSleepData();