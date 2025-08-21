import React, { useState } from 'react';
import { Link,useNavigate } from "react-router";
import axios from 'axios';

function Login() {
  
  const navigate = useNavigate();
  const[name,setName]=useState();
  const [password, setPassword] = useState();
  
  const handleLogin=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:5000/api/auth/login',{email,password})
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
          <p className="text-gray-600">Sign in to your account</p>
        </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={(e)=>setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-2 px-4 rounded font-medium bg-blue-600 hover:bg-blue-700 text-white"
          >
          Login
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-6 pt-4 border-t">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button className="text-blue-600 hover:underline font-medium">
                <Link to="/sign">
                 sign in
                </Link>
              </button>
            </p>
          </div>
        </div>
      </div>
  );
}

export default Login;