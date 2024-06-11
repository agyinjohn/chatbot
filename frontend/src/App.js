import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./global/TopBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./global/scenes/Dashboard";
import Login from "./global/Login";
import { useMode, ColorModeContext } from "./global/theme";
import Register from "./global/Register";
import { AuthContextProvider, AuthContext } from "./global/UserContext";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [theme, colorMode] = useMode();
  // const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    console.log(token);
    if (token) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <AuthContextProvider>
              <Routes>
                <Route index path={"/"} element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/chatbot"
                  element={
                    <Dashboard setIsAuthenticated={setIsAuthenticated} />
                  }
                />
                <Route path="/login" element={<Login />} />
              </Routes>
            </AuthContextProvider>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
