import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MoreVertical,
  FilePlus,
  AlertCircle,
  Upload,
  Info
} from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    priority: '', 
    severity: '', 
    issueType: '', 
    assignedTo: '', 
    duration: '', 
    plannedStartDate: '', 
    plannedCompletionDate: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
  axios
    .get('http://localhost:5000/api/project', {
      withCredentials: true // Add this to send cookies
    })
    .then((res) => {
      if (Array.isArray(res.data)) {
        setProjects(res.data);
      } else if (Array.isArray(res.data.data)) {
        setProjects(res.data.data);
      } else {
        console.error('Unexpected response format', res.data);
      }
    })
    .catch((err) => console.error('Error fetching projects:', err));
}, []);

const handleTaskSubmit = async () => {
  if (!formData.title.trim()) {
    alert('Please enter a task title');
    return;
  }

  setIsSubmitting(true);
  try {
    const response = await axios.post('http://localhost:5000/api/task', {
      title: formData.title,
      description: formData.description,
      projectId: selectedProjectId,
      priority: formData.priority,
      duration: formData.duration,
      assignedTo: formData.assignedTo,
      plannedStartDate: formData.plannedStartDate,
      plannedCompletionDate: formData.plannedCompletionDate
    }, {
      withCredentials: true // Add this to send cookies
    });

    if (response.data.success) {
      alert(`Task created successfully! Task ID: ${response.data.taskID}`);
      setFormData({
        title: '',
        description: '',
        priority: '',
        severity: '',
        issueType: '',
        assignedTo: '',
        duration: '',
        plannedStartDate: '',
        plannedCompletionDate: ''
      });
      setShowTaskForm(false);
    } else {
      alert('Failed to create task: ' + (response.data.error || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error creating task:', error);
    alert('Error creating task: ' + (error.response?.data?.error || error.message));
  } finally {
    setIsSubmitting(false);
  }

  };

  const handleIssueSubmit = async () => {
    if (!formData.title.trim()) {
      alert('Please enter an issue title');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/issue', {
        title: formData.title,
        description: formData.description,
        projectId: selectedProjectId,
        priority: formData.priority,
        severity: formData.severity,
        issueType: formData.issueType,
        assignedTo: formData.assignedTo
      });

      if (response.data.success) {
        alert(`Issue created successfully! Issue ID: ${response.data.issueID}`);
        setFormData({ 
          title: '', 
          description: '', 
          priority: '', 
          severity: '', 
          issueType: '', 
          assignedTo: '', 
          duration: '', 
          plannedStartDate: '', 
          plannedCompletionDate: '' 
        });
        setShowIssueForm(false);
      } else {
        alert('Failed to create issue: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating issue:', error);
      alert('Error creating issue: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setFormData({ 
      title: '', 
      description: '', 
      priority: '', 
      severity: '', 
      issueType: '', 
      assignedTo: '', 
      duration: '', 
      plannedStartDate: '', 
      plannedCompletionDate: '' 
    });
    setShowTaskForm(false);
    setShowIssueForm(false);
    setSelectedProjectId(null);
  };

  return (
    <div className="bg-[#001d16] min-h-screen py-12 px-6 text-white">
      <h2 className="text-5xl font-extrabold text-center text-[#00ff95] mb-12 drop-shadow-md">
        All Projects
      </h2>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((project, idx) => (
          <div
            key={project.ID || idx}
            className="bg-[#003d30] rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6 relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#00ff95]">{project.name}</h3>
              <button
                onClick={() => setActiveMenu(activeMenu === idx ? null : idx)}
                className="text-gray-300 hover:text-[#00ff95] focus:outline-none"
              >
                <MoreVertical />
              </button>
            </div>
            <p className="text-sm text-gray-300 mb-6 line-clamp-3">
              {project.description || 'No description available.'}
            </p>

            {activeMenu === idx && (
              <div className="absolute top-14 right-6 bg-[#00382f]/80 backdrop-blur border border-[#00ff95] rounded-xl shadow-xl z-10 w-48 overflow-hidden">
                <button
                  onClick={() => {
                    setSelectedProjectId(project.ID || project.id);
                    setShowTaskForm(true);
                    setActiveMenu(null);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#004d3f] text-sm text-left"
                >
                  <FilePlus size={16} /> Create Task
                </button>
                <button
                  onClick={() => {
                    setSelectedProjectId(project.ID || project.id);
                    setShowIssueForm(true);
                    setActiveMenu(null);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#004d3f] text-sm text-left"
                >
                  <AlertCircle size={16} /> Create Issue
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#004d3f] text-sm text-left">
                  <Upload size={16} /> Upload Document
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#004d3f] text-sm text-left">
                  <Info size={16} /> Project Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Task Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur flex justify-center items-center z-50">
          <div className="bg-[#003328] p-6 rounded-xl w-[90%] max-w-lg text-white max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-[#00ff95]">Create Task</h3>
            
            <input
              className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
              placeholder="Task Title *"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={isSubmitting}
            />
            
            <textarea
              className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
              placeholder="Task Description (optional)"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={isSubmitting}
            />
            
            <select
              className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              disabled={isSubmitting}
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            
            <input
              className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
              type="number"
              placeholder="Duration (hours)"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              disabled={isSubmitting}
            />
            
            <input
              className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
              placeholder="Assigned To (User ID)"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              disabled={isSubmitting}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <input
                className="w-full p-2 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
                type="date"
                placeholder="Planned Start Date"
                value={formData.plannedStartDate}
                onChange={(e) => setFormData({ ...formData, plannedStartDate: e.target.value })}
                disabled={isSubmitting}
              />
              
              <input
                className="w-full p-2 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
                type="date"
                placeholder="Planned Completion Date"
                value={formData.plannedCompletionDate}
                onChange={(e) => setFormData({ ...formData, plannedCompletionDate: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="flex justify-end gap-4">
              <button 
                onClick={closeModal} 
                className="text-gray-400 hover:text-white"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="bg-[#00ff95] text-black px-4 py-2 rounded font-bold hover:bg-[#00e085] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleTaskSubmit}
                disabled={isSubmitting || !formData.title.trim()}
              >
                {isSubmitting ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issue Modal */}
      {showIssueForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur flex justify-center items-center z-50">
          <div className="bg-[#003328] p-6 rounded-xl w-[90%] max-w-lg text-white max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-[#00ff95]">Create Issue</h3>
            
            <input
              className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
              placeholder="Issue Title *"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={isSubmitting}
            />
            
            <textarea
              className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
              placeholder="Issue Description (optional)"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={isSubmitting}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <select
                className="w-full p-2 rounded bg-[#00261f] border border-[#00ff95] text-white"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                disabled={isSubmitting}
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              
              <select
                className="w-full p-2 rounded bg-[#00261f] border border-[#00ff95] text-white"
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                disabled={isSubmitting}
              >
                <option value="">Select Severity</option>
                <option value="Critical">Critical</option>
                <option value="Major">Major</option>
                <option value="Minor">Minor</option>
                <option value="Trivial">Trivial</option>
              </select>
            </div>
            
            <input
              className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
              placeholder="Issue Type (Bug, Feature Request, etc.)"
              value={formData.issueType}
              onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
              disabled={isSubmitting}
            />
            
            <input
              className="w-full p-2 mb-4 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
              placeholder="Assigned To (User ID)"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              disabled={isSubmitting}
            />
            
            <div className="flex justify-end gap-4">
              <button 
                onClick={closeModal} 
                className="text-gray-400 hover:text-white"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="bg-[#00ff95] text-black px-4 py-2 rounded font-bold hover:bg-[#00e085] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleIssueSubmit}
                disabled={isSubmitting || !formData.title.trim()}
              >
                {isSubmitting ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}