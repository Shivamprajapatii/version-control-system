import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";


import { PageHeader } from "@primer/react";
import { Box, Button } from "@primer/react";
import "./auth.css";
import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

function Login() {
  // useEffect(() => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId");
  //   setCurrentUser(null);
  // })


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();


  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/signin", {
        email: email,
        password: password
      })
      
      const token = res.data.token;
      const userId = res.data.userId;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setCurrentUser(userId);
      setLoading(false);

      window.location.href = "/";

    } catch (error) {
      console.error(error);
      alert("failed to SignIn");
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <Box sx={{ padding: 1 }}>
            <PageHeader>
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title>Login</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </Box>
        </div>
        <div className="login-box">
          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            onClick={handleLogin}
          >
            { loading ? "Loading..." : "SignIn"}
          </Button>
        </div>
        <div className="pass-box">
          <p>
            New to GitHub? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login