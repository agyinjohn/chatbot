// import { tokens } from "../theme";

import React, { useContext, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { ColorModeContext, tokens } from "../theme";
import { Link, Navigate } from "react-router-dom";
import "../Toolbar.css";
import "../../global/ChatBot.css";
import { SendOutlined } from "@mui/icons-material";

export default function Dashboard({ setIsAuthenticated }) {
  const [Loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  function handleSelectedNav(item) {
    setSelected(item);
  }

  function logout() {
    setRedirect(true);
    localStorage.removeItem("AuthToken");
    setIsAuthenticated(false);
  }
  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const timestamp = new Date().toLocaleTimeString();
    const userMessage = { sender: "user", text: input, time: timestamp };
    setMessages([...messages, userMessage]);

    try {
      setLoading(true);

      // const response = await axios.post("http://localhost:8080/chatbot", {
      //   input: input,
      // });
      const response = await fetch("http://localhost:8080/api/chatbot", {
        method: "POST",
        body: JSON.stringify({ input }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Acess-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      console.log(data);
      const botMessage = {
        sender: "bot",
        text: data.data.reply,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, userMessage, botMessage]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Box display="flex" justifyContent="space-between" pl={10}>
        <Box borderRadius="7px">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              fontSize: 25,
              fontStyle: "bold",
              color: colors.grey[300],
            }}
          >
            {/* <img src="logo512.png" alt="my  app logo" width={70} height={70} /> */}
            <h2>DiagBot</h2>
          </Link>
        </Box>

        <Box
          display="flex"
          p={5}
          pt={2}
          pr={5}
          width={200}
          alignItems="centre"
          justifyContent="space-between"
        >
          <button className="btn-bar" onClick={logout}>
            logout
          </button>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "light" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="transparent"
        minWidth={300}
        maxWidth={900}
        p={0}
        border="none"
        overflow="hidden"
        boxShadow="none"
        borderRadius={5}
        height={670}
        sx={{ m: "auto" }}
      >
        <div className="chat-display">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message-wrapper ${msg.sender}`}>
              {msg.sender === "bot" && (
                <img
                  src="p.png"
                  color="white"
                  style={{ padding: 5 }}
                  alt={`${msg.sender} avatar`}
                  className="chat-avatar"
                />
              )}

              <div className={`chat-message ${msg.sender}`}>
                <span className="message-text">{msg.text}</span>
                <span className="message-time">{msg.time}</span>
              </div>
              {msg.sender === "user" && (
                <img
                  src="me.png"
                  alt={`${msg.sender} avatar`}
                  className="chat-avatar"
                />
              )}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />

          <IconButton onClick={handleSendMessage}>
            {Loading ? "...." : <SendOutlined />}
          </IconButton>
        </div>
      </Box>
    </div>
  );
}
