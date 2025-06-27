import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const WF_BASE_URL = 'https://vinsing.my.workfront.com/attask/api/v14.0';
const API_KEY = process.env.WORKFRONT_API_KEY;

router.post('/', async (req, res) => {
  const { title, description, projectId, priority, severity, issueType, assignedTo } = req.body;

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
    if (issueType) {
      issueData.issueType = issueType;
    }

    // Add assigned user if provided
    if (assignedTo) {
      issueData.assignedToID = assignedTo;
    }

    const response = await axios.post(
      `${WF_BASE_URL}/issue`,
      issueData,
      {
        headers: {
          'apiKey': API_KEY,
          'Content-Type': 'application/json'
        }
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
    console.error('Workfront issue creation error:');
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', err.response.data);
    } else {
      console.error(err.message);
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create issue in Workfront' 
    });
  }
});

export default router;