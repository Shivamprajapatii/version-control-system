import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';

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

  return (
    <>
      <Navbar />
      <section className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white p-6 gap-6">
        {/* Suggested Repositories */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/4 bg-gray-800 p-4 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-bold mb-3">Suggested Repositories</h3>
          {suggestedRepositories.map((repo) => (
            <motion.div
              key={repo._id}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700 p-3 rounded-lg mb-2"
            >
              <h4 className="text-lg font-semibold">{repo.name}</h4>
              <p className="text-gray-400">{repo.description}</p>
            </motion.div>
          ))}
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Your Repositories</h3>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search here..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4 space-y-3">
            {searchResults.map((repo) => (
              <motion.div
                key={repo._id}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 p-4 rounded-lg shadow-lg"
              >
                <h4 className="text-lg font-semibold">{repo.name}</h4>
                <p className="text-gray-400">{repo.description}</p>
              </motion.div>
            ))}
          </div>
        </main>

        {/* Upcoming Events */}
        <motion.aside
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/4 bg-gray-800 p-4 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-bold mb-3">Upcoming Events</h3>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-700 rounded-lg">🚀 Tech Conference - Dec 15</li>
            <li className="p-2 bg-gray-700 rounded-lg">🎤 Tech Conference - Jan 25</li>
            <li className="p-2 bg-gray-700 rounded-lg">💡 Tech Conference - Feb 15</li>
          </ul>
        </motion.aside>
      </section>
    </>
  );
}

export default Dashboard;
