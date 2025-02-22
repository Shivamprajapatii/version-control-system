import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./profile.css";
import Navbar from '../Navbar';
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react"
import HeatMap from '@uiw/react-heat-map';
import Footer from '../Footer';

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({username: "username"});

  useEffect(() => {
    async function fetchDetails() {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/userProfile/${userId}`);
          setUserDetails(response.data);
        } catch (error) {
          console.error("Cannot fetch User Details!");
        }
      }
    }
    fetchDetails();
  }, []);

  // Heatmap configuration
  const heatmapData = [
    { date: '2024-01-01', count: 2 },
    { date: '2024-01-05', count: 5 },
    // Add more data points as needed
  ];

  const weekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen">
        <UnderlineNav 
          aria-label="Repository" 
          className="bg-gray-800 px-6 py-4 shadow-lg"
        >
          <UnderlineNav.Item
            aria-current="page"
            icon={BookIcon}
            className="text-gray-300 hover:text-white text-opacity-90 font-medium text-lg px-4 py-2 transition-colors duration-300"
            sx={{
              '&[aria-current="page"]': { 
                color: 'white',
                borderBottomColor: 'white',
                fontWeight: '600'
              },
            }}
          >
            Overview
          </UnderlineNav.Item>

          <UnderlineNav.Item
            onClick={() => navigate("/repo")}
            icon={RepoIcon}
            className="text-gray-300 hover:text-white text-opacity-90 font-medium text-lg px-4 py-2 transition-colors duration-300"
          >
            Starred Repositories
          </UnderlineNav.Item>
        </UnderlineNav>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Section */}
            <div className="w-full md:w-80 bg-gray-800 rounded-xl p-6 shadow-xl">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-700 rounded-full mb-6" />
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {userDetails.username}
                </h3>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 mb-6">
                  Follow
                </button>

                <div className="flex justify-between w-full text-gray-400 px-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">10</p>
                    <p className="text-sm">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">3</p>
                    <p className="text-sm">Following</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Heatmap Section */}
            <div className="flex-1 bg-gray-800 rounded-xl p-6 shadow-xl">
              <h4 className="text-xl font-semibold text-white mb-6">
                Contribution Activity
              </h4>
              <div className="overflow-x-auto pb-4">
                <HeatMap 
                  value={heatmapData}
                  className="bg-gray-700 rounded-lg p-4"
                  style={{ color: 'white' }}
                  startDate={new Date('2024/01/01')}
                  endDate={new Date('2024/12/31')}
                  weekLabels={weekLabels}
                  monthLabels={monthLabels}
                  rectProps={{
                    rx: 3,
                    className: 'fill-green-500 hover:fill-green-400 transition-colors duration-200',
                  }}
                  panelColors={{
                    0: '#1f2937',
                    2: '#065f46',
                    4: '#059669',
                    10: '#34d399',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;