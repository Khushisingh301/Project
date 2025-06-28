import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Correct import

const backgroundImage =
  "https://www.heineken.com/media-eu/ql0lcs2n/heineken-logo.png?quality=85";
const workfrontLogo =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkY0QjAwIi8+CjxwYXRoIGQ9Ik0yMCAyMEg2MFY2MEgyMFYyMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zMCAzMEg1MFY1MEgzMFYzMFoiIGZpbGw9IiNGRjRCMDAiLz4KPC9zdmc+";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Use the hook

  // const handleLogin = async (e) => {
  //   if (e) e.preventDefault();
  //   setError('');

  //   try {
  //     const response = await axios.post('http://localhost:5000/api/login', {
  //       username,
  //       password
  //     });

  //     if (response.status === 200 && response.data.sessionID) {
  //       localStorage.setItem('sessionID', response.data.sessionID);
  //       console.log("Session ID stored:", response.data.sessionID);

  //       if (onLogin) onLogin(); // Optional callback
  //       navigate('/'); // ✅ Correct navigation
  //       window.location.reload(); // Optional: force refresh to re-render header
  //     } else {
  //       setError('Login failed.');
  //     }
  //   } catch (err) {
  //     console.error("Login error:", err);
  //     if (err.response && err.response.status === 401) {
  //       setError('Invalid username or password');
  //     } else {
  //       setError('Network error. Please try again.');
  //     }
  //   }
  // };

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Fake login, store sessionID
    localStorage.setItem("sessionID", "fake-session-id");

    // Navigate to home and reload to re-render header
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#6de03d] via-[#007A33] to-[#007A33] px-4 py-10">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-8 text-white space-y-6">
        {/* Heineken Logo */}
        <div className="flex justify-center">
          <img
            src={backgroundImage}
            alt="Heineken Logo"
            className="h-20 object-contain"
          />
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Username Field */}
          <div className="relative">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              className="w-full px-4 pt-5 pb-2 bg-white/10 text-white rounded-md outline-none peer placeholder-transparent"
              required
            />
            <label
              htmlFor="username"
              className="absolute left-4 top-2 text-white text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all"
            >
              Username
            </label>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="w-full px-4 pt-5 pb-2 bg-white/10 text-white rounded-md outline-none peer placeholder-transparent"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-white text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all"
            >
              Password
            </label>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-300 text-sm text-center">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-white/30 hover:bg-white text-white hover:text-[#5d913d] font-semibold rounded transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Workfront Logo */}
        <div className="flex flex-col items-center">
          <img
            src="image6.png" // Replace with the actual image path
            alt="Adobe Workfront Logo"
            className="h-10"
          />
          <p className="text-xl font-semibold font-sans mt-2">
            Adobe Workfront
          </p>
        </div>
      </div>
    </div>
  );
}