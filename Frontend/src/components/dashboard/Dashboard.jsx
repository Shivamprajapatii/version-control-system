import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';
import Footer from '../Footer';

function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResult] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchRepositories = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/repo/user/${userId}`);
        setRepositories(response.data.repositories);
      } catch (error) {
        console.error('Error while fetching repositories:', error);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/repo/all`);
        setSuggestedRepositories(response.data);
      } catch (error) {
        console.error('Error while fetching suggested repositories:', error);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResult(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResult(filteredRepo);
    }
  }, [searchQuery, repositories]);

  // Metrics
  const totalRepos = repositories.length;
  const totalSuggestions = suggestedRepositories.length;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        {/* Header */}
        <header className="max-w-7xl mx-auto mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-gray-800"
          >
            Welcome Back, Developer!
          </motion.h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening in your GitHub world.
          </p>
        </header>

        {/* Metrics Cards */}
        <motion.section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-md"
          >
            <h3 className="text-lg font-medium text-gray-700">Your Repositories</h3>
            <p className="mt-2 text-2xl font-bold text-gray-900">{totalRepos}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-md"
          >
            <h3 className="text-lg font-medium text-gray-700">Suggested Repos</h3>
            <p className="mt-2 text-2xl font-bold text-gray-900">{totalSuggestions}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-md"
          >
            <h3 className="text-lg font-medium text-gray-700">Search Results</h3>
            <p className="mt-2 text-2xl font-bold text-gray-900">{searchResults.length}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-md"
          >
            <h3 className="text-lg font-medium text-gray-700">Upcoming Events</h3>
            <p className="mt-2 text-2xl font-bold text-gray-900">3</p>
          </motion.div>
        </motion.section>

        {/* Main Grid */}
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Suggested Repositories */}
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-md"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Suggested Repositories</h3>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {suggestedRepositories.map((repo) => (
                <motion.div
                  key={repo._id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 border-l-4 border-blue-500 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg"
                >
                  <h4 className="text-xl font-semibold text-gray-800">{repo.name}</h4>
                  <p className="mt-1 text-gray-600">{repo.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.aside>

          {/* Your Repositories & Search */}
          <section className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Repositories</h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your repos..."
                  className="w-full p-3 bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto">
                {searchResults.map((repo) => (
                  <motion.div
                    key={repo._id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 border border-gray-200 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg"
                  >
                    <h4 className="text-lg font-semibold text-gray-800">{repo.name}</h4>
                    <p className="mt-1 text-gray-600">{repo.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Upcoming Events Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto mt-12 p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-md"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Events</h3>
          <ul className="space-y-3">
            <li className="flex items-center p-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg">
              <span className="text-2xl mr-3">🚀</span>
              <div>
                <p className="font-medium text-gray-800">Tech Conference</p>
                <p className="text-gray-600">December 15, 2025</p>
              </div>
            </li>
            <li className="flex items-center p-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg">
              <span className="text-2xl mr-3">🎤</span>
              <div>
                <p className="font-medium text-gray-800">Developer Summit</p>
                <p className="text-gray-600">January 25, 2026</p>
              </div>
            </li>
            <li className="flex items-center p-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg">
              <span className="text-2xl mr-3">💡</span>
              <div>
                <p className="font-medium text-gray-800">Innovation Expo</p>
                <p className="text-gray-600">February 15, 2026</p>
              </div>
            </li>
          </ul>
        </motion.section>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
