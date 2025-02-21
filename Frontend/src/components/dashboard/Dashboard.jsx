import axios from 'axios';
import React, { useState, useEffect } from 'react'
import "./dashboard.css"
import Navbar from '../Navbar';

function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResult] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchRepositoris = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/repo/user/${userId}`);
        setRepositories(response.data.repositories);

      } catch (error) {
        console.error("Error while fetching repositories:", error);
      }
    };

    const fetchSuggestedRepositoris = async () => {
      try {

        const response = await axios.get(`http://localhost:3000/repo/all`);
      
        setSuggestedRepositories(response.data);

      } catch (error) {
        console.error("Error while fetching suggested repositories:", error);
      }
    };

    // Call both functions
    fetchRepositoris();
    fetchSuggestedRepositoris();
  }, []);

  useEffect(() => {
    if (searchQuery == '') {
      setSearchResult(repositories);
    } else {
      const filteredRepo = repositories.filter(repo => repo.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
      setSearchResult(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section id='dashboard'>
        <aside>
          <h3>Suggested Repositories Events</h3>
          {suggestedRepositories.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            )
          })}
        </aside>
        <main>
          <h3>Your Repositories</h3>
          <div id="serach">
            <input type="text" value={searchQuery} placeholder='Search here..'
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchResults.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            )
          })}
        </main>
        <aside>
          <h3>Upcmming Events</h3>
          <ul>
            <li><p>Tech Confrence - Dec 15</p></li>
            <li><p>Tech Confrence - Jan 25</p></li>
            <li><p>Tech Confrence - Feb 15</p></li>
          </ul>
        </aside>
      </section>
    </>
  );
}

export default Dashboard