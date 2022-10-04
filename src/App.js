import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import UserContext from "./contexts/UserContext";
import { useState } from "react";

function App() {

  const [token, setToken] = useState("");
  const contextValue = { token, setToken };


  return (
    <UserContext.Provider value={contextValue}>
    <Router>
      <Routes>
            <Route path="/" element={<Login />} />;
            <Route path="signup" element={<Register />} />;
      </Routes>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
