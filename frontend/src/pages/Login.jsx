import React, { useState } from 'react';
import axios from 'axios';


const backgroundImage = "https://www.heineken.com/media-eu/ql0lcs2n/heineken-logo.png?quality=85";
const workfrontLogo = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkY0QjAwIi8+CjxwYXRoIGQ9Ik0yMCAyMEg2MFY2MEgyMFYyMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zMCAzMEg1MFY1MEgzMFYzMFoiIGZpbGw9IiNGRjRCMDAiLz4KPC9zdmc+";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

   const handleLogin = async (e) => {
    if (e) e.preventDefault(); // Prevent form submission if called from form
    
    console.log("Login button clicked");
    setError('');
    
    try {
      console.log("Sending request to backend...");
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });
      
      console.log("Response from backend:", response);
      
      if (response.status === 200 && response.data.sessionID) {
        localStorage.setItem('sessionID', response.data.sessionID);
        console.log("Session ID stored:", response.data.sessionID);
        onLogin();
      } else {
        setError('Login failed.');
      }
    } catch (err) {
      console.error("Error during login:", err);
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Network error. Please try again.');
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#6de03d] via-[#007A33] to-[#007A33] px-4 py-10 overflow-y-auto">
      <div className="w-full max-w-lg bg-transparent text-white flex flex-col items-center space-y-6">
        
        {/* Heineken Logo */}
        <div className="h-[102px] w-[200px] bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }} />

        {/* Username Field */}
        <div className="w-full relative">
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 text-white rounded outline-none peer placeholder-transparent"
            placeholder="Username"
          />
          <label
            htmlFor="username"
            className="absolute left-4 top-3 text-white text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm"
          >
            Username
          </label>
        </div>

        {/* Password Field */}
        <div className="w-full relative">
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 text-white rounded outline-none peer placeholder-transparent"
            placeholder="Password"
          />
          <label
            htmlFor="password"
            className="absolute left-4 top-3 text-white text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm"
          >
            Password
          </label>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-300 text-sm">{error}</p>}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-white/30 hover:bg-white text-white hover:text-[#5d913d] font-semibold rounded transition duration-300"
        >
          Login
        </button>

        {/* Workfront Logo */}
        <div className="flex flex-col items-center mt-4">
          <div className="h-8 w-8 bg-white rounded-full relative z-0" />
          <div
            className="h-20 w-20 bg-contain bg-center bg-no-repeat -mt-4 z-10"
            style={{ backgroundImage: `url(${workfrontLogo})` }}
          />
        </div>

        {/* Text */}
        <p className="text-xl font-semibold font-sans">Adobe Workfront</p>
      </div>
    </div>
  );
}
