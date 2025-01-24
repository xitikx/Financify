import React, { useState } from 'react';
import { auth } from '../firebase';  // Import auth from firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth method
import { useNavigate } from 'react-router-dom'; 
import '../style/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize navigate

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     setError('');
  //     navigate('/dashboard');  // Redirect to dashboard after login
  //   } catch (error) {
  //     setError(error.message);  // Display Firebase error message
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login to Your Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="input-container">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
