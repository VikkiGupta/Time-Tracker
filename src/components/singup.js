import React, { useState } from 'react';
import { Link, useNavigate } from "react-router"; // Fixed import
import axios from 'axios';

function Sign() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  // Add navigation hook
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/auth/signup', { name, email, password })
      .then(result => {
        console.log(result);
        if (result.data.success) {
          navigate('/time');
        }
      })
      .catch(err => {
        console.log(err);
        navigate('/time');
      })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <div className="mb-4">
          <Link 
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>
        
        {/* Simple Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TimeTracker</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password (min 6 characters)"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full py-2 px-4 rounded font-medium bg-blue-600 hover:bg-blue-700 text-white"
          >
            Sign Up
          </button>

          {/* Terms Notice */}
          <p className="text-xs text-gray-500 text-center mt-4">
            By creating an account, you agree to our Terms of Service
          </p>

          {/* Login Link */}
          <div className="text-center mt-6 pt-4 border-t">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign;