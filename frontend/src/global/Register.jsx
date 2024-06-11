// import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import { Link, Navigate } from "react-router-dom";
// import { tokens } from "./theme";
import { useState } from "react";
// import { FacebookRounded } from "@mui/icons-material/FacebookRounded";
import "./Login.css";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function RegisterUser(ev) {
    ev.preventDefault();
    //  setIsLoading(true)
    try {
      await fetch("http://localhost:8080/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
        },
        credentials: "include",
      });
      setEmail("");
      setPassword("");
      alert("Registration was successful");
      setRedirect(true);
    } catch (error) {
      alert(` ${error}`);
    }

    // console.log(response);
  }

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
    return <Navigate to="/login" />;
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
          <form className="login-form" onSubmit={RegisterUser}>
            <h2>Register with Email</h2>
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
              Register
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
              Already have an account? <Link to="/login">Sign In</Link>
            </button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Register;
