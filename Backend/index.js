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

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import axios from 'axios';
// import taskRoutes from './routes/task.js';
// import issueRoutes from './routes/issue.js';

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Separate base URLs
// const LOGIN_BASE_URL = 'https://m105kazi27.testdrive.workfront.com/attask/api/v20.0';
// const WF_BASE_URL = 'https://vinsing.my.workfront.com/attask/api/v14.0';

// let sessionID = null;

// // 🟩 LOGIN route (only testdrive Workfront used here)
// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const response = await axios.post(`${LOGIN_BASE_URL}/login`, null, {
//       params: { username, password }
//     });

//     sessionID = response.data.data.sessionID;
//     console.log('✅ Logged in. Session ID:', sessionID);

//     res.status(200).json({ sessionID });
//   } catch (err) {
//     console.error('❌ Login error:', err.response?.data || err.message);
//     res.status(401).json({ error: 'Login failed. Check credentials.' });
//   }
// });

// // 🟩 Example project fetch (uses vinsing + sessionID)
//  app.get('/api/project', async (req, res) => {
//   try {
//     const response = await axios.get(`${WF_BASE_URL}/project/search?fields=ID,name,description`, {
//       headers: {
//         'apiKey': API_KEY
//       }
//     });
//     res.json(response.data.data);
//   } catch (err) {
//     console.error('Error fetching projects:', err);
//     res.status(500).json({ error: 'Failed to fetch projects' });
//   }
// });

// // Other route handlers
// app.use('/api/task', taskRoutes);
// app.use('/api/issue', issueRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
