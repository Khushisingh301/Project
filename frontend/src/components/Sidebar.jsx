// import React, { useState, useEffect } from 'react';
// import {
//   X,
//   User,
//   ChevronDown,
//   ChevronRight,
//   Briefcase,
//   Layers,
//   FolderOpen,
//   Calendar,
//   BarChart3,
//   Clock,
//   Target
// } from 'lucide-react';

// export default function Sidebar({
//   isOpen = false,
//   onClose = () => {},
//   onSelectItem = () => {}
// }) {
//   const [portfolios, setPortfolios] = useState([]);
//   const [portfolioProjects, setPortfolioProjects] = useState({});
//   const [programs, setPrograms] = useState({});
//   const [projects, setProjects] = useState({});
//   const [allProjects, setAllProjects] = useState([]);
//   const [standaloneProjects, setStandaloneProjects] = useState([]);
//   const [expandedItems, setExpandedItems] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (isOpen) {
//       fetchPortfolios();
//       fetchAllProjects();
//       fetchStandaloneProjects();
//     }
//   }, [isOpen]);

//   const fetchPortfolios = async () => {
//     try {
//       // Mock data for demonstration
//       const mockPortfolios = [
//         { ID: 1, name: 'Marketing Portfolio', description: 'All marketing initiatives' },
//         { ID: 2, name: 'Product Development', description: 'New product launches' },
//         { ID: 3, name: 'IT Infrastructure', description: 'Technology improvements' }
//       ];

//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setPortfolios(mockPortfolios);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching portfolios:', error);
//       setLoading(false);
//     }
//   };

//   const fetchAllProjects = async () => {
//     try {
//       // Mock data for demonstration
//       const mockProjects = [
//         { ID: 1, name: 'Website Redesign', status: 'CUR', percentComplete: 65 },
//         { ID: 2, name: 'Mobile App', status: 'PLN', percentComplete: 20 },
//         { ID: 3, name: 'Data Migration', status: 'CPL', percentComplete: 100 },
//         { ID: 4, name: 'Security Audit', status: 'ONHLD', percentComplete: 45 }
//       ];

//       await new Promise(resolve => setTimeout(resolve, 800));
//       setAllProjects(mockProjects);
//     } catch (error) {
//       console.error('Error fetching all projects:', error);
//     }
//   };

//   const fetchStandaloneProjects = async () => {
//     try {
//       // Mock data for demonstration
//       const mockStandaloneProjects = [
//         { ID: 5, name: 'Quick Fix Project', status: 'CUR', percentComplete: 80 },
//         { ID: 6, name: 'Research Initiative', status: 'PLN', percentComplete: 10 }
//       ];

//       await new Promise(resolve => setTimeout(resolve, 600));
//       setStandaloneProjects(mockStandaloneProjects);
//     } catch (error) {
//       console.error('Error fetching standalone projects:', error);
//     }
//   };

//   const fetchPortfolioProjects = async (portfolioId) => {
//     try {
//       // Mock data for demonstration
//       const mockPortfolioProjects = {
//         1: [
//           { ID: 11, name: 'Brand Campaign', status: 'CUR', percentComplete: 70 },
//           { ID: 12, name: 'Social Media Strategy', status: 'PLN', percentComplete: 30 }
//         ],
//         2: [
//           { ID: 21, name: 'Product Launch', status: 'CUR', percentComplete: 55 }
//         ],
//         3: [
//           { ID: 31, name: 'Server Upgrade', status: 'CPL', percentComplete: 100 }
//         ]
//       };

//       await new Promise(resolve => setTimeout(resolve, 500));
//       setPortfolioProjects(prev => ({
//         ...prev,
//         [portfolioId]: mockPortfolioProjects[portfolioId] || []
//       }));
//     } catch (error) {
//       console.error('Error fetching portfolio projects:', error);
//     }
//   };

//   const fetchPrograms = async (portfolioId) => {
//     try {
//       // Mock data for demonstration
//       const mockPrograms = {
//         1: [
//           { ID: 101, name: 'Digital Marketing Program' },
//           { ID: 102, name: 'Content Strategy Program' }
//         ],
//         2: [
//           { ID: 201, name: 'Innovation Program' }
//         ],
//         3: [
//           { ID: 301, name: 'Infrastructure Modernization' }
//         ]
//       };

//       await new Promise(resolve => setTimeout(resolve, 500));
//       setPrograms(prev => ({
//         ...prev,
//         [portfolioId]: mockPrograms[portfolioId] || []
//       }));
//     } catch (error) {
//       console.error('Error fetching programs:', error);
//     }
//   };

//   const fetchProjects = async (programId) => {
//     try {
//       // Mock data for demonstration
//       const mockProgramProjects = {
//         101: [
//           { ID: 1011, name: 'SEO Optimization', status: 'CUR', percentComplete: 75 },
//           { ID: 1012, name: 'PPC Campaign', status: 'PLN', percentComplete: 25 }
//         ],
//         102: [
//           { ID: 1021, name: 'Blog Strategy', status: 'CUR', percentComplete: 60 }
//         ],
//         201: [
//           { ID: 2011, name: 'MVP Development', status: 'CUR', percentComplete: 40 }
//         ],
//         301: [
//           { ID: 3011, name: 'Cloud Migration', status: 'CUR', percentComplete: 85 }
//         ]
//       };

//       await new Promise(resolve => setTimeout(resolve, 500));
//       setProjects(prev => ({
//         ...prev,
//         [programId]: mockProgramProjects[programId] || []
//       }));
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//   };

//   const toggleExpanded = (type, id) => {
//     const key = `${type}-${id}`;
//     setExpandedItems(prev => ({
//       ...prev,
//       [key]: !prev[key]
//     }));

//     if (type === 'portfolio' && !portfolioProjects[id]) {
//       fetchPortfolioProjects(id);
//       fetchPrograms(id);
//     } else if (type === 'program' && !projects[id]) {
//       fetchProjects(id);
//     }
//   };

//   const handleItemClick = (type, id, item) => {
//     console.log(`Selected ${type}:`, id, item);
//     if (onSelectItem) {
//       onSelectItem(type, id, item);
//     }
//   };

//   const getStatusColor = (status) => {
//     if (!status) return 'text-slate-400';

//     switch (status.toLowerCase()) {
//       case 'cur':
//       case 'current':
//         return 'text-green-400';
//       case 'pln':
//       case 'planning':
//         return 'text-blue-400';
//       case 'cpl':
//       case 'complete':
//         return 'text-gray-400';
//       case 'dea':
//       case 'dead':
//         return 'text-red-400';
//       case 'onhld':
//       case 'on hold':
//         return 'text-yellow-400';
//       default:
//         return 'text-slate-400';
//     }
//   };

//   const getProgressColor = (percent) => {
//     if (percent == null || percent === undefined) return 'bg-gray-500';

//     if (percent >= 80) return 'bg-green-500';
//     if (percent >= 50) return 'bg-yellow-500';
//     if (percent >= 20) return 'bg-orange-500';
//     return 'bg-red-500';
//   };

//   const renderProgressBar = (project) => {
//     if (project.percentComplete === undefined || project.percentComplete === null) {
//       return null;
//     }

//     return (
//       <div className="flex items-center mt-1">
//         <div className="flex-1 bg-slate-600 rounded-full h-1 mr-2">
//           <div
//             className={`h-1 rounded-full transition-all duration-300 ${getProgressColor(project.percentComplete)}`}
//             style={{ width: `${Math.max(0, Math.min(100, project.percentComplete))}%` }}
//           />
//         </div>
//         <span className="text-xs text-slate-400">{project.percentComplete}%</span>
//       </div>
//     );
//   };

//   const renderProject = (project, size = 'sm') => {
//     const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
//     const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
//     const barHeight = size === 'sm' ? 'h-1' : 'h-1.5';

//     return (
//       <div key={project.ID} className="flex items-center group">
//         <button
//           onClick={() => handleItemClick('project', project.ID, project)}
//           className="flex items-center flex-1 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
//         >
//           <FolderOpen className={`${iconSize} mr-2 text-green-400`} />
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center justify-between">
//               <span className={`${textSize} font-medium text-slate-200 truncate`}>
//                 {project.name || 'Unnamed Project'}
//               </span>
//               <span className={`text-xs ml-2 ${getStatusColor(project.status)}`}>
//                 {project.status || 'N/A'}
//               </span>
//             </div>
//             {project.percentComplete !== undefined && project.percentComplete !== null && (
//               <div className="flex items-center mt-1">
//                 <div className={`flex-1 bg-slate-600 rounded-full ${barHeight} mr-2`}>
//                   <div
//                     className={`${barHeight} rounded-full transition-all duration-300 ${getProgressColor(project.percentComplete)}`}
//                     style={{ width: `${Math.max(0, Math.min(100, project.percentComplete))}%` }}
//                   />
//                 </div>
//                 <span className="text-xs text-slate-400">{project.percentComplete}%</span>
//               </div>
//             )}
//           </div>
//         </button>
//       </div>
//     );
//   };

//   return (
//     <>
//       {/* Sidebar Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`fixed top-0 left-0 h-full w-96 bg-gradient-to-b from-slate-900 to-slate-800 text-white transform transition-transform duration-300 ease-in-out z-50 shadow-2xl overflow-y-auto ${
//         isOpen ? 'translate-x-0' : '-translate-x-full'
//       }`}>
//         {/* Sidebar Header */}
//         <div className="sticky top-0 p-6 border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                 <Briefcase className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-lg font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
//                   Workfront
//                 </h2>
//                 <p className="text-xs text-slate-400">Navigation</p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Sidebar Content */}
//         <div className="p-4 flex-1">
//           {loading ? (
//             <div className="space-y-3">
//               {[...Array(5)].map((_, i) => (
//                 <div key={i} className="h-12 bg-slate-700/30 rounded-lg animate-pulse" />
//               ))}
//             </div>
//           ) : (
//             <div className="space-y-2">
//               {/* Portfolios Section */}
//               <div className="mb-6">
//                 <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
//                   <Briefcase className="w-4 h-4 mr-2" />
//                   Portfolios
//                 </h3>

//                 {portfolios.map((portfolio) => (
//                   <div key={portfolio.ID} className="mb-2">
//                     <div className="flex items-center group">
//                       <button
//                         onClick={() => toggleExpanded('portfolio', portfolio.ID)}
//                         className="flex items-center flex-1 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
//                       >
//                         {expandedItems[`portfolio-${portfolio.ID}`] ? (
//                           <ChevronDown className="w-4 h-4 mr-2 text-slate-400" />
//                         ) : (
//                           <ChevronRight className="w-4 h-4 mr-2 text-slate-400" />
//                         )}
//                         <Briefcase className="w-4 h-4 mr-2 text-purple-400" />
//                         <div className="flex-1 min-w-0">
//                           <span className="text-sm font-medium text-white truncate block">
//                             {portfolio.name || 'Unnamed Portfolio'}
//                           </span>
//                           {portfolio.description && (
//                             <span className="text-xs text-slate-400 truncate block">
//                               {portfolio.description}
//                             </span>
//                           )}
//                         </div>
//                       </button>
//                       <button
//                         onClick={() => handleItemClick('portfolio', portfolio.ID, portfolio)}
//                         className="px-2 py-1 text-xs text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         View
//                       </button>
//                     </div>

//                     {/* Show portfolio projects and programs when expanded */}
//                     {expandedItems[`portfolio-${portfolio.ID}`] && (
//                       <div className="ml-6 mt-2 space-y-3">
//                         {/* Direct Portfolio Projects */}
//                         {portfolioProjects[portfolio.ID] && portfolioProjects[portfolio.ID].length > 0 && (
//                           <div>
//                             <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center">
//                               <FolderOpen className="w-3 h-3 mr-1" />
//                               Direct Projects
//                             </h4>
//                             <div className="space-y-1">
//                               {portfolioProjects[portfolio.ID].map((project) => renderProject(project))}
//                             </div>
//                           </div>
//                         )}

//                         {/* Programs under Portfolio */}
//                         {programs[portfolio.ID] && programs[portfolio.ID].length > 0 && (
//                           <div>
//                             <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center">
//                               <Layers className="w-3 h-3 mr-1" />
//                               Programs
//                             </h4>
//                             <div className="space-y-1">
//                               {programs[portfolio.ID].map((program) => (
//                                 <div key={program.ID} className="mb-1">
//                                   <div className="flex items-center group">
//                                     <button
//                                       onClick={() => toggleExpanded('program', program.ID)}
//                                       className="flex items-center flex-1 px-3 py-2 rounded-lg hover:bg-slate-700/30 transition-colors duration-200"
//                                     >
//                                       {projects[program.ID] && projects[program.ID].length > 0 ? (
//                                         expandedItems[`program-${program.ID}`] ? (
//                                           <ChevronDown className="w-3 h-3 mr-2 text-slate-400" />
//                                         ) : (
//                                           <ChevronRight className="w-3 h-3 mr-2 text-slate-400" />
//                                         )
//                                       ) : (
//                                         <div className="w-3 h-3 mr-2" />
//                                       )}
//                                       <Layers className="w-3 h-3 mr-2 text-blue-400" />
//                                       <span className="text-xs font-medium text-slate-200 truncate">
//                                         {program.name || 'Unnamed Program'}
//                                       </span>
//                                     </button>
//                                     <button
//                                       onClick={() => handleItemClick('program', program.ID, program)}
//                                       className="px-2 py-1 text-xs text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
//                                     >
//                                       View
//                                     </button>
//                                   </div>

//                                   {/* Projects under Program */}
//                                   {expandedItems[`program-${program.ID}`] && projects[program.ID] && (
//                                     <div className="ml-6 mt-1 space-y-1">
//                                       {projects[program.ID].map((project) => renderProject(project))}
//                                     </div>
//                                   )}
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         )}

//                         {/* Loading state for portfolio expansion */}
//                         {!portfolioProjects[portfolio.ID] && !programs[portfolio.ID] && (
//                           <div className="flex items-center justify-center py-4">
//                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-400" />
//                             <span className="ml-2 text-xs text-slate-400">Loading...</span>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* All Projects Section */}
//               <div className="mb-6">
//                 <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
//                   <FolderOpen className="w-4 h-4 mr-2" />
//                   All Projects
//                 </h3>

//                 <div className="max-h-60 overflow-y-auto space-y-1">
//                   {allProjects.map((project) => renderProject(project))}
//                 </div>
//               </div>

//               {/* Standalone Projects Section */}
//               {standaloneProjects.length > 0 && (
//                 <div className="mb-6">
//                   <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
//                     <FolderOpen className="w-4 h-4 mr-2" />
//                     Standalone Projects
//                   </h3>

//                   <div className="space-y-1">
//                     {standaloneProjects.map((project) => renderProject(project, 'md'))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Sidebar Footer */}
//         <div className="sticky bottom-0 p-4 border-t border-slate-700 bg-slate-900/95 backdrop-blur-sm">
//           <div className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 cursor-pointer">
//             <User className="w-5 h-5 text-slate-400" />
//             <div>
//               <p className="text-sm font-medium text-white">User Profile</p>
//               <p className="text-xs text-slate-400">Manage account</p>
//             </div>
//           </div>
//         </div>

//         {/* Sidebar Gradient Border */}
//         <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-emerald-500/50 via-transparent to-emerald-500/50" />
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  ChevronDown,
  ChevronRight,
  Briefcase,
  Layers,
  FolderOpen,
  Calendar,
  BarChart3,
  Clock,
  Target,
} from "lucide-react";

export default function Sidebar({
  isOpen = false,
  onClose = () => {},
  onSelectItem = () => {},
}) {
  const [portfolios, setPortfolios] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState({});
  const [programs, setPrograms] = useState({});
  const [projects, setProjects] = useState({});
  const [allProjects, setAllProjects] = useState([]);
  const [standaloneProjects, setStandaloneProjects] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchPortfolios();
      fetchAllProjects();
      fetchStandaloneProjects();
    }
  }, [isOpen]);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch("/api/portfolio");

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check content type before parsing JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response received:", text);
        throw new Error("Server returned non-JSON response");
      }

      const data = await response.json();
      setPortfolios(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      setLoading(false);
      // Optionally set an error state to show user
      // setError(error.message);
    }
  };
  const fetchAllProjects = async () => {
    try {
      const response = await fetch("/api/project");
      const data = await response.json();
      setAllProjects(data);
    } catch (error) {
      console.error("Error fetching all projects:", error);
    }
  };

  const fetchStandaloneProjects = async () => {
    try {
      const response = await fetch("/api/project");
      const data = await response.json();
      // Filter projects that don't have a programID (standalone projects)
      const standalone = data.filter((project) => !project.programID);
      setStandaloneProjects(standalone);
    } catch (error) {
      console.error("Error fetching standalone projects:", error);
    }
  };

  const fetchPortfolioProjects = async (portfolioId) => {
    try {
      const response = await fetch(`/api/portfolio/${portfolioId}/projects`);
      const data = await response.json();
      setPortfolioProjects((prev) => ({ ...prev, [portfolioId]: data }));
    } catch (error) {
      console.error("Error fetching portfolio projects:", error);
    }
  };

  const fetchPrograms = async (portfolioId) => {
    try {
      const response = await fetch(`/api/portfolio/${portfolioId}/programs`);
      const data = await response.json();
      setPrograms((prev) => ({ ...prev, [portfolioId]: data }));
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const fetchProjects = async (programId) => {
    try {
      const response = await fetch(`/api/program/${programId}/projects`);
      const data = await response.json();
      setProjects((prev) => ({ ...prev, [programId]: data }));
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const toggleExpanded = (type, id) => {
    const key = `${type}-${id}`;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    if (type === "portfolio" && !portfolioProjects[id]) {
      fetchPortfolioProjects(id);
      fetchPrograms(id);
    } else if (type === "program" && !projects[id]) {
      fetchProjects(id);
    }
  };

  const handleItemClick = (type, id, item) => {
    console.log(`Selected ${type}:`, id, item);
    if (onSelectItem) {
      onSelectItem(type, id, item);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "text-slate-400";

    switch (status.toLowerCase()) {
      case "cur":
      case "current":
        return "text-green-400";
      case "pln":
      case "planning":
        return "text-blue-400";
      case "cpl":
      case "complete":
        return "text-gray-400";
      case "dea":
      case "dead":
        return "text-red-400";
      case "onhld":
      case "on hold":
        return "text-yellow-400";
      default:
        return "text-slate-400";
    }
  };

  const getProgressColor = (percent) => {
    if (percent == null || percent === undefined) return "bg-gray-500";

    if (percent >= 80) return "bg-green-500";
    if (percent >= 50) return "bg-yellow-500";
    if (percent >= 20) return "bg-orange-500";
    return "bg-red-500";
  };


  const renderProject = (project, size = "sm") => {
    const textSize = size === "sm" ? "text-xs" : "text-sm";
    const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";
    const barHeight = size === "sm" ? "h-1" : "h-1.5";

    return (
      <div key={project.ID} className="flex items-center group">
        <button
          onClick={() => handleItemClick("project", project.ID, project)}
          className="flex items-center flex-1 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
        >
          <FolderOpen className={`${iconSize} mr-2 text-green-400`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span
                className={`${textSize} font-medium text-slate-200 truncate`}
              >
                {project.name || "Unnamed Project"}
              </span>
              <span
                className={`text-xs ml-2 ${getStatusColor(project.status)}`}
              >
                {project.status || "N/A"}
              </span>
            </div>
            {project.percentComplete !== undefined &&
              project.percentComplete !== null && (
                <div className="flex items-center mt-1">
                  <div
                    className={`flex-1 bg-slate-600 rounded-full ${barHeight} mr-2`}
                  >
                    <div
                      className={`${barHeight} rounded-full transition-all duration-300 ${getProgressColor(
                        project.percentComplete
                      )}`}
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, project.percentComplete)
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-slate-400">
                    {project.percentComplete}%
                  </span>
                </div>
              )}
          </div>
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-96 bg-gradient-to-b from-slate-900 to-slate-800 text-white transform transition-transform duration-300 ease-in-out z-50 shadow-2xl overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 p-6 border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src="image6.png"
                  alt="Workfront Logo"
                  className="w-8 h-8"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Workfront
                </h2>
                <p className="text-xs text-slate-400">Navigation</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 flex-1">
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-slate-700/30 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {/* Portfolios Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Portfolios
                </h3>

                {portfolios.map((portfolio) => (
                  <div key={portfolio.ID} className="mb-2">
                    <div className="flex items-center group">
                      <button
                        onClick={() =>
                          toggleExpanded("portfolio", portfolio.ID)
                        }
                        className="flex items-center flex-1 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                      >
                        {expandedItems[`portfolio-${portfolio.ID}`] ? (
                          <ChevronDown className="w-4 h-4 mr-2 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 mr-2 text-slate-400" />
                        )}
                        <Briefcase className="w-4 h-4 mr-2 text-purple-400" />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-white truncate block">
                            {portfolio.name || "Unnamed Portfolio"}
                          </span>
                          {portfolio.description && (
                            <span className="text-xs text-slate-400 truncate block">
                              {portfolio.description}
                            </span>
                          )}
                        </div>
                      </button>
                      <button
                        onClick={() =>
                          handleItemClick("portfolio", portfolio.ID, portfolio)
                        }
                        className="px-2 py-1 text-xs text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        View
                      </button>
                    </div>

                    {/* Show portfolio projects and programs when expanded */}
                    {expandedItems[`portfolio-${portfolio.ID}`] && (
                      <div className="ml-6 mt-2 space-y-3">
                        {/* Direct Portfolio Projects */}
                        {portfolioProjects[portfolio.ID] &&
                          portfolioProjects[portfolio.ID].length > 0 && (
                            <div>
                              <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center">
                                <FolderOpen className="w-3 h-3 mr-1" />
                                Direct Projects
                              </h4>
                              <div className="space-y-1">
                                {portfolioProjects[portfolio.ID].map(
                                  (project) => renderProject(project)
                                )}
                              </div>
                            </div>
                          )}

                        {/* Programs under Portfolio */}
                        {programs[portfolio.ID] &&
                          programs[portfolio.ID].length > 0 && (
                            <div>
                              <h4 className="text-xs font-medium text-slate-500 mb-2 flex items-center">
                                <Layers className="w-3 h-3 mr-1" />
                                Programs
                              </h4>
                              <div className="space-y-1">
                                {programs[portfolio.ID].map((program) => (
                                  <div key={program.ID} className="mb-1">
                                    <div className="flex items-center group">
                                      <button
                                        onClick={() =>
                                          toggleExpanded("program", program.ID)
                                        }
                                        className="flex items-center flex-1 px-3 py-2 rounded-lg hover:bg-slate-700/30 transition-colors duration-200"
                                      >
                                        {projects[program.ID] &&
                                        projects[program.ID].length > 0 ? (
                                          expandedItems[
                                            `program-${program.ID}`
                                          ] ? (
                                            <ChevronDown className="w-3 h-3 mr-2 text-slate-400" />
                                          ) : (
                                            <ChevronRight className="w-3 h-3 mr-2 text-slate-400" />
                                          )
                                        ) : (
                                          <div className="w-3 h-3 mr-2" />
                                        )}
                                        <Layers className="w-3 h-3 mr-2 text-blue-400" />
                                        <span className="text-xs font-medium text-slate-200 truncate">
                                          {program.name || "Unnamed Program"}
                                        </span>
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleItemClick(
                                            "program",
                                            program.ID,
                                            program
                                          )
                                        }
                                        className="px-2 py-1 text-xs text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        View
                                      </button>
                                    </div>

                                    {/* Projects under Program */}
                                    {expandedItems[`program-${program.ID}`] &&
                                      projects[program.ID] && (
                                        <div className="ml-6 mt-1 space-y-1">
                                          {projects[program.ID].map((project) =>
                                            renderProject(project)
                                          )}
                                        </div>
                                      )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* Loading state for portfolio expansion */}
                        {!portfolioProjects[portfolio.ID] &&
                          !programs[portfolio.ID] && (
                            <div className="flex items-center justify-center py-4">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-400" />
                              <span className="ml-2 text-xs text-slate-400">
                                Loading...
                              </span>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* All Projects Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  All Projects
                </h3>

                <div className="max-h-60 overflow-y-auto space-y-1">
                  {allProjects.map((project) => renderProject(project))}
                </div>
              </div>

              {/* Standalone Projects Section */}
              {standaloneProjects.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Standalone Projects
                  </h3>

                  <div className="space-y-1">
                    {standaloneProjects.map((project) =>
                      renderProject(project, "md")
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="sticky bottom-0 p-4 border-t border-slate-700 bg-slate-900/95 backdrop-blur-sm">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 cursor-pointer">
            <User className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-white">User Profile</p>
              <p className="text-xs text-slate-400">Manage account</p>
            </div>
          </div>
        </div>

        {/* Sidebar Gradient Border */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-emerald-500/50 via-transparent to-emerald-500/50" />
      </div>
    </>
  );
}
