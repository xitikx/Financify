// src/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Landing.css'; // Importing the specific CSS for the landing page

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-card">
        {/* <img
          src="https://via.placeholder.com/150" // Replace with your finance-related logo URL
          alt="Financify Logo"
          className="logo"
        /> */}
        <h1>Welcome to Financify</h1>
        <p>
          Welcome to <strong>Financify</strong>, your personal financial assistant! We provide you with
          tools to effortlessly track and manage your finances, giving you the insights you need to make
          informed decisions. Whether you're planning for the future, budgeting for the present, or tracking
          expenses, Financify helps you stay in control.
        </p>
        <p>
          With our user-friendly platform, you can easily manage your expenses, set budgets, and get detailed
          financial reports. Our goal is to make financial management simpler and more accessible for everyone.
        </p>
        <div className="btn-container">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
