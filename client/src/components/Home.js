import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import MarkdownRender from './MarkdownRender';
import { askBackend } from '../services/backendService';

function Home() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [response, setResponse] = useState(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleAskClick = async () => {
    setIsLoading(true);
    const result = await askBackend(query);
    setResponse(result);
    setIsLoading(false);
  };

  return (
    <div style={{marginTop: '22px'}}>
      <TextField
        value={query}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        disabled={isLoading}
        InputProps={{
          endAdornment: (
            <Button onClick={handleAskClick} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Ask'}
            </Button>
          ),
        }}
      />
      <MarkdownRender response={response} />
    </div>
  );
}

export default Home;