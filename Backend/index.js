import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import taskRoutes from './routes/task.js';
import issueRoutes from './routes/issue.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const WF_BASE_URL = 'https://vinsing.my.workfront.com/attask/api/v14.0';
const API_KEY = process.env.WORKFRONT_API_KEY;

// Get all projects
app.get('/api/project', async (req, res) => {
  try {
    const response = await axios.get(`${WF_BASE_URL}/project/search?fields=ID,name,description`, {
      headers: {
        'apiKey': API_KEY
      }
    });
    res.json(response.data.data);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Use task and issue routes
app.use('/api/task', taskRoutes);
app.use('/api/issue', issueRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));