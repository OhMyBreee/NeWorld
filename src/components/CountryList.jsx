import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CountryList.css";
import { ThemeContext } from "../App";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("all");
  const [language, setLanguage] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = countries;

    if (searchTerm) {
      filtered = filtered.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (region !== "all") {
      filtered = filtered.filter((country) => country.region === region);
    }

    if (language !== "all") {
      filtered = filtered.filter((country) => Object.values(country.languages || {}).includes(language));
    }

    setFilteredCountries(filtered);
  }, [searchTerm, region, language, countries]);

  if (loading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (error) {
    return <p className="error-message">Failed to fetch data. Please try again later.</p>;
  }

  const handleCountryClick = (name) => {
    navigate(`/country/${name}`);
  };

  return (
    <div className={`country-list-container ${darkMode ? "dark" : "light"}`}>
      <h2>Country List</h2>
      <div className="filters">
        <input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-bar" />
        <select value={region} onChange={(e) => setRegion(e.target.value)} className="filter-dropdown">
          <option value="all">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="filter-dropdown">
          <option value="all">All Languages</option>
          {Array.from(new Set(countries.flatMap((country) => Object.values(country.languages || {})))).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div className="country-grid">
        {filteredCountries.map((country) => (
          <div key={country.cca3} className="country-card" onClick={() => handleCountryClick(country.name.common)}>
            <img src={country.flags.svg} alt={`${country.name.common} flag`} className="country-flag" />
            <h3 className="country-name">{country.name.common}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
