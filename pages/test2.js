import axios from 'axios';
import React from 'react';

const Test2 = () => {
  const handleClick = async () => {
    const { data } = await axios.post('/test', { message: 'test message' });
    console.log(data);
  };
  return <button onClick={handleClick}>Show console</button>;
};

export default Test2;
