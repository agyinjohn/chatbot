import React, { useContext, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { ColorModeContext, tokens } from "./theme";
import { Link, Navigate } from "react-router-dom";
import "./Toolbar.css";
// import { ColorModeContext, tokens } from "src/theme";

export default function TopBar({ setIsAuthenticated }) {
  const [selected, setSelected] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  function handleSelectedNav(item) {
    setSelected(item);
  }

  function logout() {
    localStorage.removeItem("AuthToken");
    setIsAuthenticated(false);
    setRedirect(true);
    if (redirect) {
      return <Navigate to="/login" />;
    }
  }

  return (
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
  );
}
