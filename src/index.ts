import express from 'express';
import { ProjectAssistant } from './projectAssistant';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5005;
app.use(cors());

const defaultProjectPath = './';

app.use(express.json());

app.post('/ask', async (req, res) => {
  const { query, project_path } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const projectAssistant = new ProjectAssistant(project_path || defaultProjectPath);

  try {
    const result = await projectAssistant.ask(query);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Error processing query' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
