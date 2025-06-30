// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   MoreVertical,
//   FilePlus,
//   AlertCircle,
//   Upload,
//   Info
// } from 'lucide-react';

// export default function Projects() {
//   const [projects, setProjects] = useState([]);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [showTaskForm, setShowTaskForm] = useState(false);
//   const [showIssueForm, setShowIssueForm] = useState(false);
//   const [selectedProjectId, setSelectedProjectId] = useState(null);
//   const [formData, setFormData] = useState({ 
//     title: '', 
//     description: '', 
//     priority: '', 
//     severity: '', 
//     issueType: '', 
//     assignedTo: '', 
//     duration: '', 
//     plannedStartDate: '', 
//     plannedCompletionDate: '' 
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//   axios
//     .get('http://localhost:5000/api/project', {
//       withCredentials: true // Add this to send cookies
//     })
//     .then((res) => {
//       if (Array.isArray(res.data)) {
//         setProjects(res.data);
//       } else if (Array.isArray(res.data.data)) {
//         setProjects(res.data.data);
//       } else {
//         console.error('Unexpected response format', res.data);
//       }
//     })
//     .catch((err) => console.error('Error fetching projects:', err));
// }, []);

// const handleTaskSubmit = async () => {
//   if (!formData.title.trim()) {
//     alert('Please enter a task title');
//     return;
//   }

//   setIsSubmitting(true);
//   try {
//     // Debug: Check if cookies are being sent
//     console.log('Document cookies:', document.cookie);
    
    
//     const taskData = {
//       title: formData.title,
//       description: formData.description,
//       projectId: selectedProjectId,
//       priority: formData.priority,
//       duration: formData.duration,
//       assignedTo: formData.assignedTo,
//       plannedStartDate: formData.plannedStartDate,
//       plannedCompletionDate: formData.plannedCompletionDate
//     };

//     const response = await fetch('http://localhost:5000/api/task', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//       body: JSON.stringify(taskData)
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log('Task created successfully:', result);
    
//     alert(`Task created successfully! Task ID: ${result.taskID || result.id}`);
//     setFormData({
//       title: '',
//       description: '',
//       priority: '',
//       severity: '',
//       assignedTo: '',
//       duration: '',
//       plannedStartDate: '',
//       plannedCompletionDate: ''
//     });
//     setShowTaskForm(false);
    
//   } catch (error) {
//     console.error('Error creating task:', error);
//     alert('Error creating task: ' + error.message);
//   } finally {
//     setIsSubmitting(false);
//   }
// };
//   // In your issue creation function
// // Replace your current handleIssueSubmit function with this corrected version:

// const handleIssueSubmit = async () => {
//   if (!formData.title.trim()) {
//     alert('Please enter an issue title');
//     return;
//   }

//   setIsSubmitting(true);
//   try {

    
//     const issueData = {
//       title: formData.title,
//       description: formData.description,
//       projectId: selectedProjectId,
//       priority: formData.priority,
//       severity: formData.severity,
      
//       assignedTo: formData.assignedTo
//     };

//     const response = await fetch('http://localhost:5000/api/issue', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include', // This ensures cookies are sent
//       body: JSON.stringify(issueData)
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log('Issue created successfully:', result);
    
//     // Show success message and reset form
//     alert(`Issue created successfully! Issue ID: ${result.issueID || result.id}`);
//     setFormData({
//       title: '',
//       description: '',
//       priority: '',
//       severity: '',
      
//       assignedTo: '',
//       duration: '',
//       plannedStartDate: '',
//       plannedCompletionDate: ''
//     });
//     setShowIssueForm(false);
    
//   } catch (error) {
//     console.error('Error creating issue:', error);
//     alert('Error creating issue: ' + error.message);
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   const closeModal = () => {
//     setFormData({ 
//       title: '', 
//       description: '', 
//       priority: '', 
//       severity: '', 
//       assignedTo: '', 
//       duration: '', 
//       plannedStartDate: '', 
//       plannedCompletionDate: '' 
//     });
//     setShowTaskForm(false);
//     setShowIssueForm(false);
//     setSelectedProjectId(null);
//   };

//   return (
//     <div className="bg-[#001d16] min-h-screen py-12 px-6 text-white">
//       <h2 className="text-5xl font-extrabold text-center text-[#00ff95] mb-12 drop-shadow-md">
//         All Projects
//       </h2>

//       <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {projects.map((project, idx) => (
//           <div
//             key={project.ID || idx}
//             className="bg-[#003d30] rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6 relative"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-[#00ff95]">{project.name}</h3>
//               <button
//                 onClick={() => setActiveMenu(activeMenu === idx ? null : idx)}
//                 className="text-gray-300 hover:text-[#00ff95] focus:outline-none"
//               >
//                 <MoreVertical />
//               </button>
//             </div>
//             <p className="text-sm text-gray-300 mb-6 line-clamp-3">
//               {project.description || 'No description available.'}
//             </p>

//             {activeMenu === idx && (
//               <div className="absolute top-14 right-6 bg-[#00382f]/80 backdrop-blur border border-[#00ff95] rounded-xl shadow-xl z-10 w-48 overflow-hidden">
//                 <button
//                   onClick={() => {
//                     setSelectedProjectId(project.ID || project.id);
//                     setShowTaskForm(true);
//                     setActiveMenu(null);
//                   }}
//                   className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#004d3f] text-sm text-left"
//                 >
//                   <FilePlus size={16} /> Create Task
//                 </button>
//                 <button
//                   onClick={() => {
//                     setSelectedProjectId(project.ID || project.id);
//                     setShowIssueForm(true);
//                     setActiveMenu(null);
//                   }}
//                   className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#004d3f] text-sm text-left"
//                 >
//                   <AlertCircle size={16} /> Create Issue
//                 </button>
//                 <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#004d3f] text-sm text-left">
//                   <Upload size={16} /> Upload Document
//                 </button>
//                 <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#004d3f] text-sm text-left">
//                   <Info size={16} /> Project Details
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Task Modal */}
//       {showTaskForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur flex justify-center items-center z-50">
//           <div className="bg-[#003328] p-6 rounded-xl w-[90%] max-w-lg text-white max-h-[90vh] overflow-y-auto">
//             <h3 className="text-xl font-bold mb-4 text-[#00ff95]">Create Task</h3>
            
//             <input
//               className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
//               placeholder="Task Title *"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               disabled={isSubmitting}
//             />
            
//             <textarea
//               className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
//               placeholder="Task Description (optional)"
//               rows={3}
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               disabled={isSubmitting}
//             />
            
//             <select
//               className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white"
//               value={formData.priority}
//               onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
//               disabled={isSubmitting}
//             >
//               <option value="">Select Priority</option>
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>
            
//             <input
//               className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
//               type="number"
//               placeholder="Duration (hours)"
//               value={formData.duration}
//               onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//               disabled={isSubmitting}
//             />
            
//             <input
//               className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
//               placeholder="Assigned To (User ID)"
//               value={formData.assignedTo}
//               onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
//               disabled={isSubmitting}
//             />
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
//               <input
//                 className="w-full p-2 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
//                 type="date"
//                 placeholder="Planned Start Date"
//                 value={formData.plannedStartDate}
//                 onChange={(e) => setFormData({ ...formData, plannedStartDate: e.target.value })}
//                 disabled={isSubmitting}
//               />
              
//               <input
//                 className="w-full p-2 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
//                 type="date"
//                 placeholder="Planned Completion Date"
//                 value={formData.plannedCompletionDate}
//                 onChange={(e) => setFormData({ ...formData, plannedCompletionDate: e.target.value })}
//                 disabled={isSubmitting}
//               />
//             </div>
            
//             <div className="flex justify-end gap-4">
//               <button 
//                 onClick={closeModal} 
//                 className="text-gray-400 hover:text-white"
//                 disabled={isSubmitting}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-[#00ff95] text-black px-4 py-2 rounded font-bold hover:bg-[#00e085] disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleTaskSubmit}
//                 disabled={isSubmitting || !formData.title.trim()}
//               >
//                 {isSubmitting ? 'Creating...' : 'Create'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Issue Modal */}
//       {showIssueForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur flex justify-center items-center z-50">
//           <div className="bg-[#003328] p-6 rounded-xl w-[90%] max-w-lg text-white max-h-[90vh] overflow-y-auto">
//             <h3 className="text-xl font-bold mb-4 text-[#00ff95]">Create Issue</h3>
            
//             <input
//               className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
//               placeholder="Issue Title *"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               disabled={isSubmitting}
//             />
            
//             <textarea
//               className="w-full p-2 mb-3 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
//               placeholder="Issue Description (optional)"
//               rows={3}
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               disabled={isSubmitting}
//             />
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
//               <select
//                 className="w-full p-2 rounded bg-[#00261f] border border-[#00ff95] text-white"
//                 value={formData.priority}
//                 onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
//                 disabled={isSubmitting}
//               >
//                 <option value="">Select Priority</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
              
//               <select
//                 className="w-full p-2 rounded bg-[#00261f] border border-[#00ff95] text-white"
//                 value={formData.severity}
//                 onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
//                 disabled={isSubmitting}
//               >
//                 <option value="">Select Severity</option>
//                 <option value="Critical">Critical</option>
//                 <option value="Major">Major</option>
//                 <option value="Minor">Minor</option>
//                 <option value="Trivial">Trivial</option>
//               </select>
//             </div>
            
            
            
//             <input
//               className="w-full p-2 mb-4 rounded bg-[#00261f] border border-[#00ff95] text-white placeholder-gray-400"
//               placeholder="Assigned To (User ID)"
//               value={formData.assignedTo}
//               onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
//               disabled={isSubmitting}
//             />
            
//             <div className="flex justify-end gap-4">
//               <button 
//                 onClick={closeModal} 
//                 className="text-gray-400 hover:text-white"
//                 disabled={isSubmitting}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-[#00ff95] text-black px-4 py-2 rounded font-bold hover:bg-[#00e085] disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleIssueSubmit}
//                 disabled={isSubmitting || !formData.title.trim()}
//               >
//                 {isSubmitting ? 'Creating...' : 'Create'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MoreVertical,
  FilePlus,
  AlertCircle,
  Upload,
  Info,
  X,
  Calendar,
  User,
  Clock,
  FileText,
  CheckCircle
} from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
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
    // Debug: Check if cookies are being sent
    console.log('Document cookies:', document.cookie);
    
    
    const taskData = {
      title: formData.title,
      description: formData.description,
      projectId: selectedProjectId,
      priority: formData.priority,
      duration: formData.duration,
      assignedTo: formData.assignedTo,
      plannedStartDate: formData.plannedStartDate,
      plannedCompletionDate: formData.plannedCompletionDate
    };

    const response = await fetch('http://localhost:5000/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(taskData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Task created successfully:', result);
    
    alert(`Task created successfully! Task ID: ${result.taskID || result.id}`);
    setFormData({
      title: '',
      description: '',
      priority: '',
      severity: '',
      assignedTo: '',
      duration: '',
      plannedStartDate: '',
      plannedCompletionDate: ''
    });
    setShowTaskForm(false);
    
  } catch (error) {
    console.error('Error creating task:', error);
    alert('Error creating task: ' + error.message);
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

    
    const issueData = {
      title: formData.title,
      description: formData.description,
      projectId: selectedProjectId,
      priority: formData.priority,
      severity: formData.severity,
      
      assignedTo: formData.assignedTo
    };

    const response = await fetch('http://localhost:5000/api/issue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // This ensures cookies are sent
      body: JSON.stringify(issueData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Issue created successfully:', result);
    
    // Show success message and reset form
    alert(`Issue created successfully! Issue ID: ${result.issueID || result.id}`);
    setFormData({
      title: '',
      description: '',
      priority: '',
      severity: '',
      
      assignedTo: '',
      duration: '',
      plannedStartDate: '',
      plannedCompletionDate: ''
    });
    setShowIssueForm(false);
    
  } catch (error) {
    console.error('Error creating issue:', error);
    alert('Error creating issue: ' + error.message);
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
      assignedTo: '', 
      duration: '', 
      plannedStartDate: '', 
      plannedCompletionDate: '' 
    });
    setShowTaskForm(false);
    setShowIssueForm(false);
    setShowProjectDetails(false);
    setSelectedProject(null);
    setSelectedProjectId(null);
  };

  const handleProjectClick = (project, event) => {
    // Prevent opening project details if clicking on the menu button
    if (event.target.closest('button')) return;
    
    setSelectedProject(project);
    setShowProjectDetails(true);
    setActiveMenu(null); // Close any open menu
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-green-400';
      case 'in progress': return 'text-yellow-400';
      case 'pending': return 'text-orange-400';
      case 'on hold': return 'text-red-400';
      default: return 'text-gray-400';
    }
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
            className="bg-[#003d30] rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6 relative cursor-pointer"
            onClick={(e) => handleProjectClick(project, e)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#00ff95]">{project.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === idx ? null : idx);
                }}
                className="text-gray-300 hover:text-[#00ff95] focus:outline-none z-10"
              >
                <MoreVertical />
              </button>
            </div>
            <p className="text-sm text-gray-300 mb-6 line-clamp-3">
              {project.description || 'No description available.'}
            </p>

            {activeMenu === idx && (
              <div className="absolute top-14 right-6 bg-[#00382f]/80 backdrop-blur border border-[#00ff95] rounded-xl shadow-xl z-20 w-48 overflow-hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProjectId(project.ID || project.id);
                    setShowTaskForm(true);
                    setActiveMenu(null);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#004d3f] text-sm text-left"
                >
                  <FilePlus size={16} /> Create Task
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProjectId(project.ID || project.id);
                    setShowIssueForm(true);
                    setActiveMenu(null);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#004d3f] text-sm text-left"
                >
                  <AlertCircle size={16} /> Create Issue
                </button>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#004d3f] text-sm text-left"
                >
                  <Upload size={16} /> Upload Document
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project, e);
                    setActiveMenu(null);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#004d3f] text-sm text-left"
                >
                  <Info size={16} /> Project Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {showProjectDetails && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur flex justify-center items-center z-50">
          <div className="bg-[#003328] rounded-xl w-[90%] max-w-4xl text-white max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-[#004d3f] p-6 rounded-t-xl flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#00ff95]">Project Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-300 hover:text-[#00ff95] focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Project Title */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#00ff95] mb-2">
                  {selectedProject.name}
                </h1>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className={getStatusColor(selectedProject.status)} />
                  <span className={`text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                    {selectedProject.status || 'Status not specified'}
                  </span>
                </div>
              </div>

              {/* Project Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="bg-[#002b23] p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <User size={16} className="text-[#00ff95]" />
                      <h3 className="font-semibold text-[#00ff95]">Project Manager</h3>
                    </div>
                    <p className="text-gray-300">
                      {selectedProject.projectManager || selectedProject.owner || 'Not assigned'}
                    </p>
                  </div>

                  <div className="bg-[#002b23] p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={16} className="text-[#00ff95]" />
                      <h3 className="font-semibold text-[#00ff95]">Start Date</h3>
                    </div>
                    <p className="text-gray-300">
                      {formatDate(selectedProject.startDate || selectedProject.createdDate)}
                    </p>
                  </div>

                  <div className="bg-[#002b23] p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={16} className="text-[#00ff95]" />
                      <h3 className="font-semibold text-[#00ff95]">End Date</h3>
                    </div>
                    <p className="text-gray-300">
                      {formatDate(selectedProject.endDate || selectedProject.completionDate)}
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                  <div className="bg-[#002b23] p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText size={16} className="text-[#00ff95]" />
                      <h3 className="font-semibold text-[#00ff95]">Project ID</h3>
                    </div>
                    <p className="text-gray-300">
                      {selectedProject.ID || selectedProject.id || 'N/A'}
                    </p>
                  </div>

                  <div className="bg-[#002b23] p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle size={16} className="text-[#00ff95]" />
                      <h3 className="font-semibold text-[#00ff95]">Priority</h3>
                    </div>
                    <p className="text-gray-300">
                      {selectedProject.priority || 'Not specified'}
                    </p>
                  </div>

                  <div className="bg-[#002b23] p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={16} className="text-[#00ff95]" />
                      <h3 className="font-semibold text-[#00ff95]">Created Date</h3>
                    </div>
                    <p className="text-gray-300">
                      {formatDate(selectedProject.createdAt || selectedProject.createdDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[#002b23] p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={16} className="text-[#00ff95]" />
                  <h3 className="font-semibold text-[#00ff95]">Description</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {selectedProject.description || 'No description provided for this project.'}
                </p>
              </div>

              {/* Additional Details */}
              {(selectedProject.budget || selectedProject.team || selectedProject.department) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {selectedProject.budget && (
                    <div className="bg-[#002b23] p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-[#00ff95] mb-1">Budget</h4>
                      <p className="text-gray-300">${selectedProject.budget}</p>
                    </div>
                  )}
                  {selectedProject.team && (
                    <div className="bg-[#002b23] p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-[#00ff95] mb-1">Team Size</h4>
                      <p className="text-gray-300">{selectedProject.team} members</p>
                    </div>
                  )}
                  {selectedProject.department && (
                    <div className="bg-[#002b23] p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-[#00ff95] mb-1">Department</h4>
                      <p className="text-gray-300">{selectedProject.department}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t border-[#004d3f]">
                <button
                  onClick={() => {
                    setSelectedProjectId(selectedProject.ID || selectedProject.id);
                    setShowProjectDetails(false);
                    setShowTaskForm(true);
                  }}
                  className="bg-[#00ff95] text-black px-4 py-2 rounded font-bold hover:bg-[#00e085] flex items-center gap-2"
                >
                  <FilePlus size={16} />
                  Create Task
                </button>
                <button
                  onClick={() => {
                    setSelectedProjectId(selectedProject.ID || selectedProject.id);
                    setShowProjectDetails(false);
                    setShowIssueForm(true);
                  }}
                  className="bg-orange-500 text-white px-4 py-2 rounded font-bold hover:bg-orange-600 flex items-center gap-2"
                >
                  <AlertCircle size={16} />
                  Create Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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