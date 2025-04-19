// Login.jsx
import React, { useState ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../config/axios';
import {UserContext} from '../context/user.context';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const {setUser} = useContext(UserContext);
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  //   rememberMe: false,
  // });

  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here
    axios.post('/users/login', {
      email: email,
      password: password,
      // rememberMe: rememberMe,
      }
    )
      .then((response) => {
        console.log("Login successful:", response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        setUser(response.data.data);
        // Handle successful login (e.g., store token, redirect)
        navigate('/home');
      })
      .catch((error) => {
        console.error("Login error:", error);
        // Handle login error (e.g., show error message)
      });
    console.log("Login form submitted:", { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-orange-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Log In</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-500">or</span>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <img
                className="h-5 w-5 mr-2"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
              />
              Login with Google
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
