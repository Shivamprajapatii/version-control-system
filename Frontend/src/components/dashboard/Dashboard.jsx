import axios from 'axios';
import React, { useState, useEffect } from 'react'

function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResult] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    
    const fetchRepositoris = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/user/${userId}`);
        const data = await response.json();
       
        setRepositories(data.repositories);

      } catch (error) {
        console.error("Error while fetching repositories:", error);
      }
    };

    const fetchSuggestedRepositoris = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/all`);
        const data = await response.json();
       
        setSuggestedRepositories(data);
        
      } catch (error) {
        console.error("Error while fetching suggested repositories:", error);
      }
    };

    // Call both functions
    fetchRepositoris();
    fetchSuggestedRepositoris();
  }, []);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard