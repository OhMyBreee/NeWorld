import { useContext } from "react";
import "./About.css";
import { ThemeContext } from "../App"; // Assuming ThemeContext is defined globally.

const About = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`about-container ${darkMode ? "dark" : "light"}`}>
      <h2>About NeWorld</h2>
      <p>NeWorld is a platform to explore nations with a twist.</p>
      <h3>Custom Country: Avalon</h3>
      <p>Avalon is a peaceful utopia with technological wonders and natural beauty.</p>
      <h4>6 Other Countries in NeWorld:</h4>
      <ul>
        <li>Japan</li>
        <li>New Zealand</li>
        <li>Sweden</li>
        <li>Canada</li>
        <li>Norway</li>
        <li>Australia</li>
      </ul>
    </div>
  );
};

export default About;
