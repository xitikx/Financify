// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Use navigate for programmatic navigation
// import { createUser } from '../firebase'; // Import the createUser function from Firebase
// import '../style/SignUpPage.css'; // Importing specific CSS for the sign-up page

// function SignUpPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Use navigate to redirect the user

//   const handleSignUp = async (e) => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//     } else {
//       try {
//         // Sign up user and store data in Firestore
//         await createUser(email, password, name);  // Create user and store in Firestore
//         setError(''); // Reset error message if sign up is successful
//         navigate('/login'); // Redirect to login page after successful sign up
//       } catch (error) {
//         setError(error.message); // Display any error messages
//       }
//     }
//   };

//   return (
//     <div className="signup-page">
//       <div className="signup-card">
//         <h2>Create a New Account</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSignUp}>
//           <div className="input-container">
//             <label>Name</label>
//             <input 
//               type="text" 
//               placeholder="Enter your full name" 
//               value={name} 
//               onChange={(e) => setName(e.target.value)} 
//               required 
//             />
//           </div>

//           <div className="input-container">
//             <label>Email</label>
//             <input 
//               type="email" 
//               placeholder="Enter your email" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//               required 
//             />
//           </div>

//           <div className="input-container">
//             <label>Password</label>
//             <input 
//               type="password" 
//               placeholder="Enter your password" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               required 
//             />
//           </div>

//           <div className="input-container">
//             <label>Confirm Password</label>
//             <input 
//               type="password" 
//               placeholder="Confirm your password" 
//               value={confirmPassword} 
//               onChange={(e) => setConfirmPassword(e.target.value)} 
//               required 
//             />
//           </div>

//           <button type="submit" className="btn">Sign Up</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignUpPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate for programmatic navigation
import { createUser } from '../firebase'; // Import the createUser function from Firebase
import axios from 'axios'; // Import axios for API calls
import '../style/SignUpPage.css'; // Importing specific CSS for the sign-up page

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate to redirect the user

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      try {
        // Sign up user in Firebase Authentication
        await createUser(email, password, name);  // Create user and store in Firestore

        // Call the backend API to insert the user into the MySQL database
        const response = await axios.post('http://localhost:5000/signup', {
          email,
          name
        });

        setError(''); // Reset error message if sign up is successful
        navigate('/login'); // Redirect to login page after successful sign up
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message); // Display any error messages
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Create a New Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="input-container">
            <label>Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

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

          <div className="input-container">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm your password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createUser } from '../firebase'; // Firebase function to create user
// import axios from 'axios';
// import '../style/SignUpPage.css';

// function SignUpPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     // Validate email format
//     if (!email.includes('@')) {
//       setError('Please enter a valid email address.');
//       return;
//     }

//     // Validate password length
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters long.');
//       return;
//     }

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     try {
//       // Sign up user in Firebase Authentication
//       await createUser(email, password, name);

//       // Save email to localStorage
//       localStorage.setItem('email', email);

//       // Determine the API endpoint
//       const apiUrl =
//         process.env.NODE_ENV === 'production'
//           ? 'https://your-production-url.com/signup'
//           : 'http://localhost:5000/signup';

//       // Call backend API to insert user into MySQL database
//       const response = await axios.post(apiUrl, { email, name });
//       console.log('API Response:', response);

//       setError(''); // Reset error message
//       navigate('/login'); // Redirect to login page on success
//     } catch (error) {
//       console.error('Sign-up error:', error);
//       setError(
//         error.response ? error.response.data.message : error.message || 'An error occurred during sign-up.'
//       );
//     }
//   };

//   return (
//     <div className="signup-page">
//       <div className="signup-card">
//         <h2>Create a New Account</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSignUp}>
//           <div className="input-container">
//             <label>Name</label>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-container">
//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-container">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-container">
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               placeholder="Confirm your password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn">
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignUpPage;

