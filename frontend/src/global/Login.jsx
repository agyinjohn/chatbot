import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";

import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onsubmitForm = async (ev) => {
    ev.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Acess-Control-Allow-Origin": "*",
        },
      });
      if (response.ok) {
        setRedirect(true);
      }
      const res = await response.json();
      localStorage.setItem("AuthToken", res.data.token);
      setEmail("");
      setPassword("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
    console.log("Sign in with Google");
  };

  const handleFacebookSignIn = () => {
    // Handle Facebook sign-in logic here
    console.log("Sign in with Facebook");
  };

  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <Box
        minHeight={400}
        maxHeight={600}
        minWidth={400}
        maxWidth={500}
        sx={{ margin: "auto" }}
      >
        <div className="login-container">
          <form className="login-form" onSubmit={onsubmitForm}>
            <h2>Login</h2>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              {isLoading ? "Loading" : "Login"}
            </button>
            <div className="social-login">
              <button
                type="button"
                className="google-button"
                onClick={handleGoogleSignIn}
              >
                <div className="b-items">
                  <img
                    src="f.png"
                    alt="this is google icon"
                    width={25}
                    height={25}
                    color="white"
                  />
                  <p>Sign in with Facebook</p>
                </div>
              </button>
              <button
                type="button"
                className="facebook-button"
                onClick={handleFacebookSignIn}
              >
                <div className="b-items">
                  <img
                    src="g.png"
                    alt="this is google icon"
                    width={25}
                    height={25}
                    color="transparent"
                  />
                  <p>Sign in with Google</p>
                </div>
              </button>
            </div>
          </form>
          <div className="sign-up-link">
            <button>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Login;
