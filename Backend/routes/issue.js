import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const WF_BASE_URL = 'https://m105kazi27.testdrive.workfront.com/attask/api/v14.0';

router.post('/', async (req, res) => {
  const { title, description, projectId, priority, severity, assignedTo } = req.body;

  // Get session ID from cookies
  const sessionID = req.cookies.sessionID;
  console.log('Issue creation - Received cookies:', req.cookies);
  
  if (!sessionID) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required',
      message: 'No session ID found. Please login first.'
    });
  }

  // Validate required fields
  if (!title || !projectId) {
    return res.status(400).json({
      success: false,
      error: 'Title and Project ID are required'
    });
  }

  // Priority mapping for Workfront
  const priorityMap = {
    'High': '2',
    'Medium': '3',
    'Low': '4'
  };

  // Severity mapping for Workfront
  const severityMap = {
    'Critical': '1',
    'Major': '2',
    'Minor': '3',
    'Trivial': '4'
  };

  const wfPriority = priorityMap[priority] || '3';
  const wfSeverity = severityMap[severity] || '3';

  try {
    const issueData = {
      name: title,
      description: description || '',
      projectID: projectId,
      status: 'NEW',
      priority: wfPriority,
      severity: wfSeverity
    };

    // Add issue type if provided
    

    // Add assigned user if provided
    if (assignedTo) {
      issueData.assignedToID = assignedTo;
    }

    console.log('Issue creation - Using sessionID:', sessionID);
    console.log('Issue creation - Issue data:', issueData);

    const response = await axios.post(
      `${WF_BASE_URL}/issue?sessionID=${sessionID}`,
      issueData,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    const issueID = response.data.data.ID;
    console.log("Issue created successfully:", { issueID, title, projectId });

    res.status(201).json({
      success: true,
      message: 'Issue created successfully',
      issueID: issueID
    });

  } catch (err) {
    console.error('Issue creation - Error details:', {
      message: err.message,
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data
    });

    if (err.response?.status === 401 || err.response?.status === 403) {
      res.status(401).json({
        success: false,
        error: 'Authentication failed',
        message: 'Your session is invalid or expired. Please login again.'
      });
    } else if (err.response?.status === 400) {
      res.status(400).json({
        success: false,
        error: 'Bad request',
        message: err.response?.data?.error?.message || err.response?.data?.message || 'Invalid request data'
      });
    } else {
      res.status(err.response?.status || 500).json({
        success: false,
        error: 'Failed to create issue in Workfront',
        message: err.response?.data?.error?.message || err.response?.data?.message || err.message
      });
    }
  }
});

export default router;