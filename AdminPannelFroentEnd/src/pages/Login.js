import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const navigate = useNavigate()

  const [userObj, setUserObj] = useState({
    username: '',
    mobile: '',
    password: '',
  })

  const handleSubmit = () => {

    if (!userObj.mobile || !userObj.password || (isSignUp && !userObj.username)) {
      alert("Please fill in all fields.")
      return;
    }

    if (isSignUp) {
      axios.post('http://localhost:5001/api/user', userObj)
        .then(
          (res) => { alert(res.data) },
          (err) => { alert(err) }
        );
    } else {
      axios.post('http://localhost:5001/api/user/verify-login', userObj)
        .then((res) => {
          console.log("Response:", res.data);
          alert(JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error("Error:", err);
          alert("Error: " + JSON.stringify(err.response?.data || err.message));
        });

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#161928] p-4">
      <div className="bg-[#1e2235] p-8 rounded-lg shadow-2xl w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-8">{isSignUp ? 'Sign Up' : 'Login'}</h2>

        <form className="space-y-6">

          <div>
            <label className="block text-sm font-semibold mb-2">Mobile</label>
            <input
              type="number"
              value={userObj.mobile}
              onChange={(e) => setUserObj({ ...userObj, mobile: e.target.value })}
              className="w-full px-4 py-3 bg-[#2a2f4a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your mobile number"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-semibold mb-2">Username</label>
              <input
                type="text"
                value={userObj.username}
                onChange={(e) => setUserObj({ ...userObj, username: e.target.value })}
                className="w-full px-4 py-3 bg-[#2a2f4a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={userObj.password}
              onChange={(e) => setUserObj({ ...userObj, password: e.target.value })}
              className="w-full px-4 py-3 bg-[#2a2f4a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
          onClick={()=> handleSubmit()}
          
            className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-400 ml-1 hover:underline"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth;
