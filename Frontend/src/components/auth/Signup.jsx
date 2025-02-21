import React, { useState } from 'react';
import axios from "axios";
import { useAuth } from '../../authContext';

import { PageHeader } from "@primer/react";
import { Box, Button } from "@primer/react";
import logo from "../../assets/github-mark-white.svg";
import { Link } from 'react-router-dom';
import "./auth.css";

const Signup = () => {
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const { setCurrentUser } = useAuth();

  async function handleSignup(event) {
    event.preventDefault()

      try {
        setLoading(true);
        const res = await axios.post("http://localhost:3000/signup",{
          email : email,
          username : username,
          password : password
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
    <div className="login-wrapper">

      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="gitHub Image" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          < Box sx={{ padding: 1 }}>
            < PageHeader >
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title>Sign Up</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </Box>
        </div>

        <div className="login-box">
          <div>
            <label className="label">Username</label>
            <input
              autoComplete="off"
              name="Username"
              id="Username"
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername( e.target.value ) }
            />
          </div>

          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value )}
            />
          </div>

          <div className="div">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value )}
            />
          </div>

          <Button onClick={handleSignup} variant="primary" className="login-btn" disabled={loading}>
            { loading ? "Loading.." : "SignUp"}
          </Button>
        </div>

        <div className="pass-box">
          <p>
            Already have an account? < Link to="/login">Login</Link>
          </p>
        </div>
      </div>

    </div>
  )
}

export default Signup