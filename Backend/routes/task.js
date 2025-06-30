import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const WF_BASE_URL = 'https://m105kazi27.testdrive.workfront.com/attask/api/v14.0';

router.post('/', async (req, res) => {
  const { title, description, projectId, priority, duration, assignedTo, plannedStartDate, plannedCompletionDate } = req.body;
  
  // Get session ID from cookies
  const sessionID = req.cookies.sessionID;
  
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

  const wfPriority = priorityMap[priority] || '3';

  try {
    const taskData = {
      name: title,
      description: description || '',
      projectID: projectId,
      status: 'NEW',
      priority: wfPriority,
      sessionID: sessionID  // Add session ID to the request data
    };

    // Add duration if provided (in minutes)
    if (duration) {
      taskData.duration = parseInt(duration) * 60; // Convert hours to minutes
    }

    // Add assigned user if provided
    if (assignedTo) {
      taskData.assignedToID = assignedTo;
    }

    // Add planned start date if provided
    if (plannedStartDate) {
      taskData.plannedStartDate = plannedStartDate;
    }

    // Add planned completion date if provided
    if (plannedCompletionDate) {
      taskData.plannedCompletionDate = plannedCompletionDate;
    }

    const response = await axios.post(
      `${WF_BASE_URL}/task`,
      taskData,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    const taskID = response.data.data.ID;
    console.log("Task created successfully:", { taskID, title, projectId });
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      taskID: taskID
    });

  } catch (err) {
    console.error('Workfront task creation error:');
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', err.response.data);
      
      // Handle specific Workfront errors
      if (err.response.status === 401) {
        return res.status(401).json({
          success: false,
          error: 'Session expired. Please login again.'
        });
      }
    } else {
      console.error(err.message);
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to create task in Workfront'
    });
  }
});

export default router;