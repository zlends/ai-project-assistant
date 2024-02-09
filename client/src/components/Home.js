import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Grid, Switch, FormControlLabel } from '@mui/material';
import MarkdownRender from './MarkdownRender';
import { askBackend } from '../services/backendService';

function Home() {
  const [query, setQuery] = useState('');
  const [projectPath, setProjectPath] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [response, setResponse] = useState(null);
  const [switch1, setSwitch1] = useState(false); // состояние для первого переключателя
  const [switch2, setSwitch2] = useState(false); // состояние для второго переключателя

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleProjectPathChange = (event) => {
    setProjectPath(event.target.value);
  };

  const handleAskClick = async () => {
    setIsLoading(true);
    const result = await askBackend(query, projectPath);
    setResponse(result);
    setIsLoading(false);
  };

  const handleSwitchChange = (event) => { // обработчик для переключателей
    const { name, checked } = event.target;
    if (name === 'switch1') {
      setSwitch1(checked);
    } else if (name === 'switch2') {
      setSwitch2(checked);
    }
  };

  return (
    <Grid container style={{ paddingTop: '20px' }} spacing={2}>
      <Grid item xs={8} >
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
      </Grid>
      <Grid item xs={4}>
        <TextField
          value={projectPath}
          onChange={handleProjectPathChange}
          variant="outlined"
          fullWidth
          disabled={isLoading}
          placeholder="Project path (optional)"
        />
        <FormControlLabel // первый переключатель
          control={<Switch checked={switch1} onChange={handleSwitchChange} name="switch1" />}
          label="Switch 1"
        />
        <FormControlLabel // второй переключатель
          control={<Switch checked={switch2} onChange={handleSwitchChange} name="switch2" />}
          label="Switch 2"
        />
      </Grid>
    </Grid>
  );
}

export default Home;