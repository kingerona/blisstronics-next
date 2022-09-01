import axios from 'axios';
import React from 'react';

const Test = () => {
  const handleClick = async () => {
    const data = await axios.get('/api/test');
    console.log(data);
  };

  return (
    <div>
      <button onClick={handleClick}>Generate</button>
    </div>
  );
};

export default Test;
