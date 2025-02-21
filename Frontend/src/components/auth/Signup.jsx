import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/github-mark-white.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  async function handleSignup(event) {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/signup", {
        email: email,
        username: username,
        password: password,
      });

      console.log(res);
      const token = res.data.token;
      const userId = res.data.userId;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setCurrentUser(userId);
      setLoading(false);

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Signup failed");
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 text-white rounded-2xl shadow-lg p-8 max-w-md w-full"
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="GitHub Logo" className="w-16 h-16 mb-3" />
          <h2 className="text-3xl font-bold">Sign Up</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              autoComplete="off"
              name="Username"
              id="Username"
              className="w-full px-4 py-2 mt-1 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="w-full px-4 py-2 mt-1 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="w-full px-4 py-2 mt-1 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            {loading ? "Loading..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
