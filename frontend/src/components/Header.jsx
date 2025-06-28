import React, { useState, useEffect } from "react";
import {
  Menu,
  User,
  Home,
  FolderOpen,
  Users,
  FileText,
  X,
  Search,
  ChevronDown,
  LogIn,
  LogOut,
} from "lucide-react";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import Login from "../pages/Login";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/", icon: Home, active: true },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Teams", href: "/teams", icon: Users },
    { name: "Requests", href: "/requests", icon: FileText },
  ];

  // Check for existing session on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      // Check if user is already logged in
      const storedSessionId = localStorage.getItem('sessionId');
      console.log('Checking sessionId from localStorage:', storedSessionId); // Debug log
      
      if (storedSessionId) {
        setIsLoggedIn(true);
        setSessionId(storedSessionId);
        console.log('User is logged in with session:', storedSessionId); // Debug log
      } else {
        setIsLoggedIn(false);
        setSessionId(null);
        console.log('No valid session found'); // Debug log
      }
    };

    // Check on mount
    checkLoginStatus();

    // Also listen for storage changes (in case user logs in from another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'sessionId') {
        checkLoginStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Handle login (this will be called from your login component)
  const handleLogin = (newSessionId) => {
    console.log('Login successful with sessionId:', newSessionId); // Debug log
    localStorage.setItem('sessionId', newSessionId);
    setSessionId(newSessionId);
    setIsLoggedIn(true);
    setShowLogin(false); // Close login modal
  };

  // Handle logout with API call
  // Handle logout with API call
const handleLogout = async () => {
  try {
    console.log('Logging out with sessionId:', sessionId); // Debug log
    
    // Call logout API with proper credentials
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // This ensures cookies are sent automatically
      body: JSON.stringify({ sessionId: sessionId }) // Send sessionId in body as backup
    });

    console.log('Logout response status:', response.status); // Debug log

    if (response.ok) {
      const data = await response.json();
      console.log('Logout API call successful:', data);
    } else {
      console.error('Logout API call failed:', response.status);
      const errorText = await response.text();
      console.error('Error details:', errorText);
    }
  } catch (error) {
    console.error('Error calling logout API:', error);
  } finally {
    // Always clear local session regardless of API response
    localStorage.removeItem('sessionId');
    setSessionId(null);
    setIsLoggedIn(false);
    console.log('Local session cleared');
  }
};
  console.log('Header render - isLoggedIn:', isLoggedIn, 'sessionId:', sessionId); // Debug log

  return (
    <>
      <header className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl overflow-hidden z-30">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-700/20 via-transparent to-transparent"></div>

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Section - Menu Button & Logo */}
            <div className="flex items-center space-x-6">
              {/* Menu Button - Only show when logged in */}
              {isLoggedIn && (
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
                  aria-label="Toggle sidebar"
                >
                  <Menu className="w-6 h-6 group-hover:scale-105 transition-transform duration-200" />
                </button>
              )}

              {/* Logo Section */}
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src="images.svg" // Replace with the actual logo file path
                    alt="Heineken Logo"
                    className="w-20 h-20 object-contain hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Center Section - Navigation & Search (Only show when logged in) */}
            {isLoggedIn && (
              <div className="hidden lg:flex items-center space-x-8">
                {/* Desktop Navigation */}
                <nav className="flex items-center space-x-1">
                  {navigationItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                          item.active
                            ? "text-emerald-400 bg-emerald-500/10"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="relative z-10">{item.name}</span>
                        {item.active && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full"></div>
                        )}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-300"></div>
                      </a>
                    );
                  })}
                </nav>

                {/* Search Bar Component */}
                <div className="w-80">
                  <SearchBar />
                </div>
              </div>
            )}

            {/* Right Section - Login Button or User Icons */}
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                // Login Button
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                  aria-label="Login"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              ) : (
                // User Menu and Logout when logged in
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-300 hidden sm:block">
                    Welcome back!
                  </span>
                  
                  {/* User Icon with Dropdown */}
                  <div className="relative group">
                    <button
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
                      aria-label="User menu"
                    >
                      <User className="w-6 h-6 group-hover:scale-105 transition-transform duration-200" />
                    </button>
                    
                    {/* User Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        <div className="px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                          Session: {sessionId?.substring(0, 8)}...
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Standalone Logout Icon */}
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all duration-200 group"
                    aria-label="Logout"
                    title="Logout"
                  >
                    <LogOut className="w-6 h-6 group-hover:scale-105 transition-transform duration-200" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation - Only show when logged in */}
          {isLoggedIn && (
            <div className="lg:hidden pb-4">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        item.active
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{item.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Mobile Search Component */}
              <SearchBar />
            </div>
          )}
        </div>

        {/* Bottom Border Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      </header>

      {/* Sidebar Component - Only show when logged in */}
      {isLoggedIn && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      )}

      {/* Login Component */}
      {showLogin && (
        <Login 
          isOpen={showLogin} 
          onClose={() => setShowLogin(false)} 
          onLogin={handleLogin} 
        />
      )}
    </>
  );
}




// import React, { useState } from "react";
// import {
//   Menu,
//   User,
//   Home,
//   FolderOpen,
//   Users,
//   FileText,
//   LogIn
// } from "lucide-react";
// import SearchBar from "./SearchBar";
// import Sidebar from "./Sidebar";
// import { useNavigate } from "react-router-dom";

// export default function Header() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   const navigationItems = [
//     { name: "Home", href: "/", icon: Home, active: true },
//     { name: "Projects", href: "/projects", icon: FolderOpen },
//     { name: "Teams", href: "/teams", icon: Users },
//     { name: "Requests", href: "/requests", icon: FileText },
//   ];

//   return (
//     <>
//       <header className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl overflow-hidden z-30">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-700/20 via-transparent to-transparent"></div>

//         {/* Main Container */}
//         <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             {/* Left Section - Menu Button & Logo */}
//             <div className="flex items-center space-x-6">
//               <button
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                 className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
//                 aria-label="Toggle sidebar"
//               >
//                 <Menu className="w-6 h-6 group-hover:scale-105 transition-transform duration-200" />
//               </button>

//               <div className="flex items-center">
//                 <img
//                   src="images.svg"
//                   alt="Heineken Logo"
//                   className="w-20 h-20 object-contain hover:scale-105 transition-transform duration-200"
//                 />
//               </div>
//             </div>

//             {/* Center Section - Navigation & Search */}
//             <div className="hidden lg:flex items-center space-x-8">
//               <nav className="flex items-center space-x-1">
//                 {navigationItems.map((item) => {
//                   const IconComponent = item.icon;
//                   return (
//                     <a
//                       key={item.name}
//                       href={item.href}
//                       className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
//                         item.active
//                           ? "text-emerald-400 bg-emerald-500/10"
//                           : "text-slate-300 hover:text-white hover:bg-white/5"
//                       }`}
//                     >
//                       <IconComponent className="w-4 h-4" />
//                       <span className="relative z-10">{item.name}</span>
//                       {item.active && (
//                         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full"></div>
//                       )}
//                       <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-300"></div>
//                     </a>
//                   );
//                 })}
//               </nav>

//               <div className="w-80">
//                 <SearchBar />
//               </div>
//             </div>

//             {/* Right Section - User + Login Icons */}
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => navigate("/login")}
//                 className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
//                 aria-label="Login"
//               >
//                 <LogIn className="w-6 h-6 group-hover:scale-105 transition-transform duration-200" />
//               </button>
//               <button
//                 className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
//                 aria-label="User menu"
//               >
//                 <User className="w-6 h-6 group-hover:scale-105 transition-transform duration-200" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
//       </header>

//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//     </>
//   );
// }
