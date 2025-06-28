import React, { useState } from "react";
import axios from "axios";
import { X, Eye, EyeOff, LogIn } from "lucide-react";

export default function Login({ isOpen, onClose, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
      username,
      password,
    }, {
      withCredentials: true, // Important for cookies - equivalent to credentials: 'include'
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });

      if (response.status === 200 && response.data.sessionID) {
        // Store sessionID in localStorage with consistent key
        localStorage.setItem("sessionId", response.data.sessionID);
        console.log('Login response:', response.data);
console.log('SessionID from response:', response.data.sessionID);
        
        // Call the onLogin callback to update Header state
        if (onLogin) {
          onLogin(response.data.sessionID);
        }
        
        // Clear form
        setUsername("");
        setPassword("");
        
        // Close modal
        onClose();
        
      } else {
        setError("Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700/50 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-500 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <LogIn className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-emerald-100 mt-2">Sign in to your Workfront account</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-slate-300">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your username"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-300 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/25"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="text-center text-sm text-slate-400">
            Having trouble? Contact your system administrator
          </div>
        </div>
      </div>
    </div>
  );
}