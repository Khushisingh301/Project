

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import taskRoutes from './routes/task.js';
import issueRoutes from './routes/issue.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // This is important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

//const cookieParser = require('cookie-parser');
app.use(cookieParser());

const WF_BASE_URL = 'https://m105kazi27.testdrive.workfront.com/attask/api/v20.0';

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Add request validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  try {
    // Use POST request with form data for Workfront login
    const workfrontUrl = `${WF_BASE_URL}/login`;
    
    console.log('Attempting login to Workfront...'); // Debug log
    
    // Create form data
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await axios.post(workfrontUrl, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });
    
    console.log('Workfront response status:', response.status); // Debug log
    console.log('Workfront response data:', response.data); // Debug log
    
    const sessionID = response.data?.data?.sessionID || response.data?.sessionID;
    
    if (sessionID) {
      res.cookie('sessionID', sessionID, {
        httpOnly: true,
        sameSite: 'lax'
      });
      res.json({ 
  success: true, 
  sessionID: sessionID 
});
    } else {
      console.log('No sessionID in response:', response.data);
      res.status(401).json({ error: 'Invalid credentials' });
    }
    
  } catch (err) {
    console.error('Login error details:', {
      message: err.message,
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data
    });
    
    // Handle different types of errors
    if (err.response) {
      // Workfront returned an error response
      if (err.response.status === 401) {
        res.status(401).json({ error: 'Invalid username or password' });
      } else if (err.response.status === 403) {
        res.status(401).json({ error: 'Access denied' });
      } else {
        res.status(500).json({ error: 'Authentication service error' });
      }
    } else if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
      res.status(500).json({ error: 'Cannot connect to authentication service' });
    } else if (err.code === 'ECONNABORTED') {
      res.status(500).json({ error: 'Request timeout' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Logout route
app.post('/api/logout', async (req, res) => {
  const sessionID = req.headers.cookie?.replace('sessionID=', '') || req.body.sessionId;
  
  if (!sessionID) {
    return res.status(400).json({ error: 'Session ID is required' });
  }
  
  try {
    console.log('Attempting logout from Workfront...'); // Debug log
    
    // Call Workfront logout endpoint
    const workfrontUrl = `${WF_BASE_URL}/logout`;
    
    const response = await axios.post(workfrontUrl, {}, {
      headers: {
        'Cookie': `sessionID=${sessionID}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });
    
    console.log('Workfront logout response status:', response.status); // Debug log
    console.log('Workfront logout response data:', response.data); // Debug log
    
    
    res.json({ 
      success: true, 
      message: 'Logout successful' 
    });
    
  } catch (err) {
    console.error('Logout error details:', {
      message: err.message,
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data
    });
    
    
    res.json({ 
      success: true, 
      message: 'Local logout successful',
      warning: 'Server logout may have failed'
    });
  }
});


// app.get('/api/portfolio', async (req, res) => {
//   try {
//     const sessionID = req.cookies.sessionID;
//     console.log('Portfolio - Received cookies:', req.cookies);
    
//     if (!sessionID) {
//       return res.status(401).json({ 
//         error: 'Authentication required',
//         message: 'No session ID found. Please login first.'
//       });
//     }
    
//     console.log('Portfolio - Using sessionID:', sessionID);
    
//     const response = await axios.get(
//       `${WF_BASE_URL}/portfolio/search?sessionID=${sessionID}&fields=ID,name,description,isActive,portfolioManager,owner,enteredByID,entryDate,lastUpdateDate`,
//       {
//         headers: {
//           'Accept': 'application/json'
//         },
//         timeout: 10000
//       }
//     );
    
//     console.log('Portfolio - Success! Response status:', response.status);
//     console.log('Portfolio - Response data:', response.data);
    
//     // Handle different response structures and return portfolios directly
//     const portfolios = response.data?.data || response.data;
//     res.json(portfolios);
    
//   } catch (err) {
//     console.error('Portfolio - Error fetching portfolios:', {
//       message: err.message,
//       status: err.response?.status,
//       statusText: err.response?.statusText,
//       data: err.response?.data
//     });
    
//     if (err.response?.status === 401 || err.response?.status === 403) {
//       res.status(401).json({
//         error: 'Authentication failed',
//         message: 'Your session is invalid or expired. Please login again.'
//       });
//     } else {
//       res.status(err.response?.status || 500).json({
//         error: 'Failed to fetch portfolios',
//         message: err.response?.data?.error?.message || err.response?.data?.message || err.message
//       });
//     }
//   }
// });

// Get all projects using sessionID from request header cookie
// Use this as your main /api/project endpoint
app.get('/api/project', async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    console.log('Received cookies:', req.cookies);
    
    if (!sessionID) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'No session ID found. Please login first.'
      });
    }
    
    console.log('Using sessionID:', sessionID);
    
    const response = await axios.get(
      `${WF_BASE_URL}/project/search?sessionID=${sessionID}&fields=ID,name,description,status,percentComplete,plannedStartDate,plannedCompletionDate,programID`,
      {
        headers: {
          'Accept': 'application/json'
        },
        timeout: 10000
      }
    );
    
    console.log('Success! Response status:', response.status);
    
    // Handle different response structures and return projects directly
    const projects = response.data?.data || response.data;
    res.json(projects);
    
  } catch (err) {
    console.error('Error fetching projects:', {
      message: err.message,
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data
    });
    
    if (err.response?.status === 401 || err.response?.status === 403) {
      res.status(401).json({
        error: 'Authentication failed',
        message: 'Your session is invalid or expired. Please login again.'
      });
    } else {
      res.status(err.response?.status || 500).json({
        error: 'Failed to fetch projects',
        message: err.response?.data?.error?.message || err.response?.data?.message || err.message
      });
    }
  }
});
app.use('/api/task', taskRoutes);
app.use('/api/issue', issueRoutes);

//++++++++++++++++++++++++++++++++++++++

app.get('/api/portfolio', async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    console.log('Portfolios - Received cookies:', req.cookies);
    
    if (!sessionID) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'No session ID found. Please login first.'
      });
    }
    
    console.log('Portfolios - Using sessionID:', sessionID);
    
    const response = await axios.get(
      `${WF_BASE_URL}/portfolio/search?sessionID=${sessionID}&fields=ID,name,description,isActive,owner,enteredByID,entryDate,lastUpdateDate`,
      {
        headers: {
          'Accept': 'application/json'
        },
        timeout: 10000
      }
    );
    
    console.log('Portfolios - Success! Response status:', response.status);
    
    const portfolios = response.data?.data || response.data;
    res.json(portfolios);
    
  } catch (err) {
    console.error('Portfolios - Error fetching portfolios:', err);
    
    if (err.response?.status === 401 || err.response?.status === 403) {
      res.status(401).json({
        error: 'Authentication failed',
        message: 'Your session is invalid or expired. Please login again.'
      });
    } else {
      res.status(err.response?.status || 500).json({
        error: 'Failed to fetch portfolios',
        message: err.response?.data?.error?.message || err.response?.data?.message || err.message
      });
    }
  }
});



// Get projects by portfolio ID
app.get('/api/portfolio/:portfolioId/projects', async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    const { portfolioId } = req.params;
    
    if (!sessionID) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'No session ID found. Please login first.'
      });
    }
    
    console.log(`Portfolio Projects - Using sessionID: ${sessionID}, portfolioId: ${portfolioId}`);
    
    // Get projects that belong directly to this portfolio (not through a program)
    const response = await axios.get(
      `${WF_BASE_URL}/project/search?sessionID=${sessionID}&portfolioID=${portfolioId}&programID_Mod=isnull&fields=ID,name,description,status,percentComplete,plannedStartDate,plannedCompletionDate,programID,portfolioID`,
      {
        headers: {
          'Accept': 'application/json'
        },
        timeout: 10000
      }
    );
    
    console.log('Portfolio Projects - Success! Response status:', response.status);
    
    const projects = response.data?.data || response.data;
    res.json(projects);
    
  } catch (err) {
    console.error('Portfolio Projects - Error fetching projects:', err);
    
    if (err.response?.status === 401 || err.response?.status === 403) {
      res.status(401).json({
        error: 'Authentication failed',
        message: 'Your session is invalid or expired. Please login again.'
      });
    } else {
      res.status(err.response?.status || 500).json({
        error: 'Failed to fetch portfolio projects',
        message: err.response?.data?.error?.message || err.response?.data?.message || err.message
      });
    }
  }
});

// Get programs by portfolio ID
app.get('/api/portfolio/:portfolioId/programs', async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    const { portfolioId } = req.params;
    
    if (!sessionID) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'No session ID found. Please login first.'
      });
    }
    
    console.log(`Portfolio Programs - Using sessionID: ${sessionID}, portfolioId: ${portfolioId}`);
    
    const response = await axios.get(
      `${WF_BASE_URL}/program/search?sessionID=${sessionID}&portfolioID=${portfolioId}&fields=ID,name,description,portfolioID`,
      {
        headers: {
          'Accept': 'application/json'
        },
        timeout: 10000
      }
    );
    
    console.log('Portfolio Programs - Success! Response status:', response.status);
    
    const programs = response.data?.data || response.data;
    res.json(programs);
    
  } catch (err) {
    console.error('Portfolio Programs - Error fetching programs:', err);
    
    if (err.response?.status === 401 || err.response?.status === 403) {
      res.status(401).json({
        error: 'Authentication failed',
        message: 'Your session is invalid or expired. Please login again.'
      });
    } else {
      res.status(err.response?.status || 500).json({
        error: 'Failed to fetch portfolio programs',
        message: err.response?.data?.error?.message || err.response?.data?.message || err.message
      });
    }
  }
});

// Get projects by program ID
app.get('/api/program/:programId/projects', async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    const { programId } = req.params;
    
    if (!sessionID) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'No session ID found. Please login first.'
      });
    }
    
    console.log(`Program Projects - Using sessionID: ${sessionID}, programId: ${programId}`);
    
    const response = await axios.get(
      `${WF_BASE_URL}/project/search?sessionID=${sessionID}&programID=${programId}&fields=ID,name,description,status,percentComplete,plannedStartDate,plannedCompletionDate,programID,portfolioID`,
      {
        headers: {
          'Accept': 'application/json'
        },
        timeout: 10000
      }
    );
    
    console.log('Program Projects - Success! Response status:', response.status);
    
    const projects = response.data?.data || response.data;
    res.json(projects);
    
  } catch (err) {
    console.error('Program Projects - Error fetching projects:', err);
    
    if (err.response?.status === 401 || err.response?.status === 403) {
      res.status(401).json({
        error: 'Authentication failed',
        message: 'Your session is invalid or expired. Please login again.'
      });
    } else {
      res.status(err.response?.status || 500).json({
        error: 'Failed to fetch program projects',
        message: err.response?.data?.error?.message || err.response?.data?.message || err.message
      });
    }
  }
});
//+++++++++++++++++++++++++++++++

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));