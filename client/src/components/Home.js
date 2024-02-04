import React, { useState } from 'react';
import CustomInput from './CustomInput';
import MarkdownRender from './MarkdownRender';
import { askBackend } from '../services/backendService';

function Home() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleAskClick = async () => {
    const result = await askBackend(query);
    setResponse(result);
  };

  return (
    <>
      <CustomInput value={query} onChange={handleInputChange} />
      <MarkdownRender response={response} />
      <button onClick={handleAskClick}>Ask</button>
    </>
  );
}

export default Home;