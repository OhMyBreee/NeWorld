// import { useEffect, useState, useContext } from "react";
// import Slider from "react-slick";
// import axios from "axios";
// import { ThemeContext } from "../App"; // Assuming ThemeContext is defined in App.js
// import "./CountryCarousel.css";

// function CountryListPage() {
//   const [countries, setCountries] = useState([]);
//   const { theme } = useContext(ThemeContext); // Get the current theme from context

//   useEffect(() => {
//     axios
//       .get("https://restcountries.com/v3.1/all")
//       .then((response) => {
//         // Sort by population descending for the carousel
//         const sortedCountries = response.data.sort((a, b) => b.population - a.population);
//         setCountries(sortedCountries);
//       })
//       .catch((error) => {
//         console.error("Error fetching countries:", error);
//       });
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className={`country-list ${theme}`}>
//       <h1 className="country-list-title">Explore Countries</h1>
//       {countries.length > 0 ? (
//         <Slider {...settings}>
//           {countries.map((country) => (
//             <div className="country-item" key={country.cca3}>
//               <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="country-flag" onClick={() => (window.location.href = `/country/${country.name.common}`)} />
//               <h3 className="country-name">{country.name.common}</h3>
//             </div>
//           ))}
//         </Slider>
//       ) : (
//         <p>Loading countries...</p>
//       )}
//     </div>
//   );
// }

// export default CountryListPage;
