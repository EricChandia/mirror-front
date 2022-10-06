import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import UserContext from "./contexts/UserContext";
import { useState } from "react";
import Home from "./pages/home/Home";
import CreateProfile from "./pages/profile/CreateProfile";

function App() {

  const [token, setToken] = useState("");
  const contextValue = { token, setToken };


  return (
    <UserContext.Provider value={contextValue}>
    <Router>
      <Routes>
            <Route path="/" element={<Login />} />;
            <Route path="signup" element={<Register />} />;
            <Route path="home" element={<Home />} />;
            <Route path="createProfile" element={<CreateProfile />} />;
      </Routes>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
