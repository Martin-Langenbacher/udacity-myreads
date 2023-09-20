import React from "react";
import { Link } from "react-router-dom";

import Header from "./components/Header";

const NotFoundPage = () => {
  return (
    <div className="search-books">
      <Header />
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>

      <div className="search-button-back">
        <Link to="/">
          <button>Go back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
