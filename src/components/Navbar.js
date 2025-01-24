import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css'; // Make sure you have this file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Project Name (Clickable Link to Dashboard) */}
        <Link to="/dashboard" className="navbar-brand">
          Financify
        </Link>

        {/* Button for See Expenses
        <Link to="/expenses" className="btn-see-expenses">
          See Expenses
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
