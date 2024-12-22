import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ThemeContext } from "../App";
import "./CountryDetail.css";

const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => {
        setCountry(response.data[0]);
      })
      .catch(() => setError(true));
  }, [name]);

  if (error) {
    return <p className="error-message">Error loading country details.</p>;
  }

  if (!country) {
    return <p className="loading-message">Loading...</p>;
  }

  const { latlng } = country;

  return (
    <div className={`country-detail-container ${darkMode ? "dark" : "light"}`}>
      <h2 className="country-name">{country.name.common}</h2>
      <img src={country.flags.svg} alt={`${country.name.common} flag`} className="country-flag" />
      <div className="country-info">
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Capital:</strong> {country.capital}
        </p>
      </div>
      <MapContainer center={latlng} zoom={4} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={latlng}>
          <Popup>{country.name.common}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CountryDetail;
