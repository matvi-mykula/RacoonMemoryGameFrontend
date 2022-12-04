import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function getIP() {
  //creating IP state
  //   const [ip, setIP] = useState('');

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    console.log(res.data);
    const userIP = res.data.IPv4;
    return userIP;
  };

  return getData();
}

export { getIP };
