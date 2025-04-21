import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { UnderlineNav } from '@primer/react';
import { BookIcon, RepoIcon } from '@primer/octicons-react';
import HeatMap from '@uiw/react-heat-map';

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: 'Loading...', followers: 0, following: 0, imageUrl: '' });

  useEffect(() => {
    async function fetchDetails() {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const { data } = await axios.get(`http://localhost:3000/userProfile/${userId}`);
          setUserDetails(data);
        } catch {
          console.error('Cannot fetch User Details!');
        }
      }
    }
    fetchDetails();
  }, []);

  const heatmapData = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return { date: date.toISOString().slice(0, 10), count: Math.floor(Math.random() * 5) };
  }).reverse();

  const weekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Profile Card */}
        <div className="col-span-1 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
          <img
            src={userDetails.imageUrl || '/assets/default-avatar.png'}
            alt="User avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-md mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{userDetails.username}</h2>
          <div className="flex space-x-6 text-gray-700 mb-4">
            <div>
              <p className="text-xl font-semibold">{userDetails.followers}</p>
              <p className="text-sm">Followers</p>
            </div>
            <div>
              <p className="text-xl font-semibold">{userDetails.following}</p>
              <p className="text-sm">Following</p>
            </div>
          </div>
          <button
            className="mt-auto px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => alert('Feature coming soon!')}
          >
            Follow
          </button>
        </div>

        {/* Contribution Heatmap and Nav */}
        <div className="col-span-2 space-y-6">
          <UnderlineNav aria-label="Profile navigation" className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-2xl px-6 py-3 shadow-inner">
            <UnderlineNav.Item aria-current="page" icon={BookIcon} className="text-gray-700">
              Overview
            </UnderlineNav.Item>
            <UnderlineNav.Item onClick={() => navigate('/repo')} icon={RepoIcon} className="text-gray-700">
              Starred
            </UnderlineNav.Item>
          </UnderlineNav>

          <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contribution Activity</h3>
            <HeatMap
              value={heatmapData}
              rectSize={14}
              rectGap={4}
              startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
              endDate={new Date()}
              weekLabels={weekLabels}
              monthLabels={monthLabels}
              panelColors={{ 0: '#f0f0f0', 1: '#c6e48b', 3: '#7bc96f', 5: '#239a3b', 10: '#196127' }}
            />
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}

export default Profile;