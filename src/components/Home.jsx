import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeContext } from "../App"; // Import the theme context
import "./Home.css";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const sortedCountries = response.data.sort((a, b) => b.population - a.population).slice(0, 5); // Top 5 by population
        setCountries(sortedCountries);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch countries. Please try again later.");
        setLoading(false);
      });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={`home-container ${darkMode ? "dark" : "light"}`}>
      <img className="background-image" src="src/assets/Hero_image.jpeg" alt="Hero background" />
      <div className="Hero">
        <h2 className="welcome-title">Welcome to NeWorld</h2>
        <p className="welcome-subtitle">Explore the world's nations with a simple and elegant interface.</p>
      </div>

      {loading ? (
        <p className="loading-text">Loading countries...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="country-carousel">
          <h3 className="top5">Top 5 Countries by Population</h3>
          <Slider {...sliderSettings}>
            {countries.map((country) => (
              <div key={country.name.common} className="country-card">
                <img src={country.flags.svg} alt={`${country.name.common} flag`} className="country-flag" onClick={() => (window.location.href = `/country/${country.name.common}`)} />
                <h3 className="country-name">{country.name.common}</h3>
                <p className="country-population">Population: {country.population.toLocaleString()}</p>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Home;
