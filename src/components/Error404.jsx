import { Link } from "react-router-dom";
import "./Error.css";

const Error404 = () => {
  return (
    <div className="error">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Error404;
