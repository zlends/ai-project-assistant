import React, { useState } from 'react';
import './styles/main.css';
import CustomInput from './components/CustomInput';
import MarkdownRender from './components/MarkdownRender';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleAskClick = async () => {
    const result = await fetch('http://localhost:5005/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const json = await result.json();
    setResponse(json.result);
  };

  return (
    <div className="App">
      <CustomInput type="text" value={query} onChange={handleInputChange} />
      <button onClick={handleAskClick}>Ask</button>
      {response && <MarkdownRender response={response} />}
    </div>
  );
}

export default App;