import React, { useState, useEffect } from 'react';
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
  Target
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, onSelectItem }) {
  const [portfolios, setPortfolios] = useState([]);
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
      const response = await fetch('/api/portfolios');
      const data = await response.json();
      setPortfolios(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      setLoading(false);
    }
  };

  const fetchAllProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setAllProjects(data);
    } catch (error) {
      console.error('Error fetching all projects:', error);
    }
  };

  const fetchStandaloneProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      // Filter projects that don't have a programID (standalone projects)
      const standalone = data.filter(project => !project.programID);
      setStandaloneProjects(standalone);
    } catch (error) {
      console.error('Error fetching standalone projects:', error);
    }
  };

  const fetchPrograms = async (portfolioId) => {
    try {
      const response = await fetch(`/api/portfolios/${portfolioId}/programs`);
      const data = await response.json();
      setPrograms(prev => ({ ...prev, [portfolioId]: data }));
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const fetchProjects = async (programId) => {
    try {
      const response = await fetch(`/api/programs/${programId}/projects`);
      const data = await response.json();
      setProjects(prev => ({ ...prev, [programId]: data }));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const toggleExpanded = (type, id) => {
    const key = `${type}-${id}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));

    if (type === 'portfolio' && !programs[id]) {
      fetchPrograms(id);
    } else if (type === 'program' && !projects[id]) {
      fetchProjects(id);
    }
  };

  const handleItemClick = (type, id, item) => {
    if (onSelectItem) {
      onSelectItem(type, id, item);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'cur': case 'current': return 'text-green-400';
      case 'pln': case 'planning': return 'text-blue-400';
      case 'cpl': case 'complete': return 'text-gray-400';
      case 'dea': case 'dead': return 'text-red-400';
      case 'onhld': case 'on hold': return 'text-yellow-400';
      default: return 'text-slate-400';
    }
  };

  const getProgressColor = (percent) => {
    if (percent >= 80) return 'bg-green-500';
    if (percent >= 50) return 'bg-yellow-500';
    if (percent >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProjectsByPortfolio = (portfolioId) => {
    return allProjects.filter(project => {
      // Find if this project belongs to any program in this portfolio
      const portfolioPrograms = programs[portfolioId] || [];
      return portfolioPrograms.some(program => 
        projects[program.ID]?.some(p => p.ID === project.ID)
      );
    });
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
      <div className={`fixed top-0 left-0 h-full w-96 bg-gradient-to-b from-slate-900 to-slate-800 text-white transform transition-transform duration-300 ease-in-out z-50 shadow-2xl overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="sticky top-0 p-6 border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
               <img
                  src="image6.png" // Replace with the actual image path
                  alt="Adobe Workfront Logo"
                  className="h-8"/>
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
                <div key={i} className="h-12 bg-slate-700/30 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {/* All Projects Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  All Projects
                </h3>
                
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {allProjects.map((project) => (
                    <div key={project.ID} className="flex items-center group">
                      <button
                        onClick={() => handleItemClick('project', project.ID, project)}
                        className="flex items-center flex-1 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                      >
                        <FolderOpen className="w-3 h-3 mr-2 text-green-400" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-200 truncate">{project.name}</span>
                            <span className={`text-xs ml-2 ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                          {project.percentComplete !== undefined && (
                            <div className="flex items-center mt-1">
                              <div className="flex-1 bg-slate-600 rounded-full h-1 mr-2">
                                <div
                                  className={`h-1 rounded-full ${getProgressColor(project.percentComplete)}`}
                                  style={{ width: `${project.percentComplete}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-slate-400">{project.percentComplete}%</span>
                            </div>
                          )}
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

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
                        onClick={() => toggleExpanded('portfolio', portfolio.ID)}
                        className="flex items-center flex-1 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                      >
                        {programs[portfolio.ID]?.length > 0 ? (
                          expandedItems[`portfolio-${portfolio.ID}`] ? (
                            <ChevronDown className="w-4 h-4 mr-2 text-slate-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 mr-2 text-slate-400" />
                          )
                        ) : (
                          <div className="w-4 h-4 mr-2" />
                        )}
                        <Briefcase className="w-4 h-4 mr-2 text-purple-400" />
                        <span className="text-sm font-medium text-white truncate">{portfolio.name}</span>
                      </button>
                      <button
                        onClick={() => handleItemClick('portfolio', portfolio.ID, portfolio)}
                        className="px-2 py-1 text-xs text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        View
                      </button>
                    </div>

                    {/* Show portfolio projects directly when expanded */}
                    {expandedItems[`portfolio-${portfolio.ID}`] && (
                      <div className="ml-6 mt-2">
                        {/* Portfolio Projects (direct association) */}
                        {getProjectsByPortfolio(portfolio.ID).length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-slate-500 mb-2">Portfolio Projects</h4>
                            <div className="space-y-1">
                              {getProjectsByPortfolio(portfolio.ID).map((project) => (
                                <div key={project.ID} className="flex items-center group">
                                  <button
                                    onClick={() => handleItemClick('project', project.ID, project)}
                                    className="flex items-center flex-1 px-3 py-2 rounded-lg hover:bg-slate-700/20 transition-colors duration-200"
                                  >
                                    <FolderOpen className="w-3 h-3 mr-2 text-green-400" />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-300 truncate">{project.name}</span>
                                        <span className={`text-xs ml-2 ${getStatusColor(project.status)}`}>
                                          {project.status}
                                        </span>
                                      </div>
                                      {project.percentComplete !== undefined && (
                                        <div className="flex items-center mt-1">
                                          <div className="flex-1 bg-slate-600 rounded-full h-1 mr-2">
                                            <div
                                              className={`h-1 rounded-full ${getProgressColor(project.percentComplete)}`}
                                              style={{ width: `${project.percentComplete}%` }}
                                            ></div>
                                          </div>
                                          <span className="text-xs text-slate-400">{project.percentComplete}%</span>
                                        </div>
                                      )}
                                    </div>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Programs under Portfolio */}
                        {programs[portfolio.ID] && programs[portfolio.ID].length > 0 && (
                          <div>
                            <h4 className="text-xs font-medium text-slate-500 mb-2">Programs</h4>
                            <div className="space-y-1">
                              {programs[portfolio.ID].map((program) => (
                                <div key={program.ID} className="mb-1">
                                  <div className="flex items-center group">
                                    <button
                                      onClick={() => toggleExpanded('program', program.ID)}
                                      className="flex items-center flex-1 px-3 py-2 rounded-lg hover:bg-slate-700/30 transition-colors duration-200"
                                    >
                                      {projects[program.ID]?.length > 0 ? (
                                        expandedItems[`program-${program.ID}`] ? (
                                          <ChevronDown className="w-3 h-3 mr-2 text-slate-400" />
                                        ) : (
                                          <ChevronRight className="w-3 h-3 mr-2 text-slate-400" />
                                        )
                                      ) : (
                                        <div className="w-3 h-3 mr-2" />
                                      )}
                                      <Layers className="w-3 h-3 mr-2 text-blue-400" />
                                      <span className="text-xs font-medium text-slate-200 truncate">{program.name}</span>
                                    </button>
                                    <button
                                      onClick={() => handleItemClick('program', program.ID, program)}
                                      className="px-2 py-1 text-xs text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      View
                                    </button>
                                  </div>

                                  {/* Projects under Program */}
                                  {expandedItems[`program-${program.ID}`] && projects[program.ID] && (
                                    <div className="ml-6 mt-1 space-y-1">
                                      {projects[program.ID].map((project) => (
                                        <div key={project.ID} className="flex items-center group">
                                          <button
                                            onClick={() => handleItemClick('project', project.ID, project)}
                                            className="flex items-center flex-1 px-3 py-2 rounded-lg hover:bg-slate-700/20 transition-colors duration-200"
                                          >
                                            <FolderOpen className="w-3 h-3 mr-2 text-green-400" />
                                            <div className="flex-1 min-w-0">
                                              <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-slate-300 truncate">{project.name}</span>
                                                <span className={`text-xs ml-2 ${getStatusColor(project.status)}`}>
                                                  {project.status}
                                                </span>
                                              </div>
                                              {project.percentComplete !== undefined && (
                                                <div className="flex items-center mt-1">
                                                  <div className="flex-1 bg-slate-600 rounded-full h-1 mr-2">
                                                    <div
                                                      className={`h-1 rounded-full ${getProgressColor(project.percentComplete)}`}
                                                      style={{ width: `${project.percentComplete}%` }}
                                                    ></div>
                                                  </div>
                                                  <span className="text-xs text-slate-400">{project.percentComplete}%</span>
                                                </div>
                                              )}
                                            </div>
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Standalone Projects Section */}
              {standaloneProjects.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Standalone Projects
                  </h3>
                  
                  {standaloneProjects.map((project) => (
                    <div key={project.ID} className="flex items-center group mb-1">
                      <button
                        onClick={() => handleItemClick('project', project.ID, project)}
                        className="flex items-center flex-1 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                      >
                        <FolderOpen className="w-4 h-4 mr-2 text-green-400" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white truncate">{project.name}</span>
                            <span className={`text-xs ml-2 ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                          {project.percentComplete !== undefined && (
                            <div className="flex items-center mt-1">
                              <div className="flex-1 bg-slate-600 rounded-full h-1.5 mr-2">
                                <div
                                  className={`h-1.5 rounded-full ${getProgressColor(project.percentComplete)}`}
                                  style={{ width: `${project.percentComplete}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-slate-400">{project.percentComplete}%</span>
                            </div>
                          )}
                        </div>
                      </button>
                    </div>
                  ))}
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
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-emerald-500/50 via-transparent to-emerald-500/50"></div>
      </div>
    </>
  );
}