import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail.jsx";
import About from "./components/About";
import Error404 from "./components/Error404";
import "./App.css";

export const ThemeContext = createContext();

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<CountryList />} />
            <Route path="/country/:name" element={<CountryDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
