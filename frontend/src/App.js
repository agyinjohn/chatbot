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
            {isAuthenticated && (
              <Topbar setIsAuthenticated={setIsAuthenticated} />
            )}
            <AuthContextProvider>
              <Routes>
                <Route
                  index
                  path={"/login"}
                  element={isAuthenticated ? <Dashboard /> : <Login />}
                />
                <Route
                  path="/register"
                  element={isAuthenticated ? <Dashboard /> : <Register />}
                />
                <Route
                  path="/"
                  element={isAuthenticated ? <Dashboard /> : <Login />}
                />
              </Routes>
            </AuthContextProvider>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
