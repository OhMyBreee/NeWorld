import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";
import "./Navbar.css";

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="neworld">NeWorld</div>
      <div className="container" id="nav-menu">
        <button id="lord">
          <Link to="/" className="nav-button montserrat-400">
            Home
          </Link>
        </button>
        <button id="lord">
          <Link to="/countries" className="nav-button montserrat-400">
            Countries
          </Link>
        </button>
        <button id="lord">
          <Link to="/about" className="nav-button montserrat-400">
            About
          </Link>
        </button>
      </div>
      <button id="lord" onClick={toggleTheme}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
