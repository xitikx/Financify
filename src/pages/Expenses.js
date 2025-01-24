import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

// function Expenses() {
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const email = localStorage.getItem('email');
//         if (!email) {
//           setError('No email found in localStorage');
//           setLoading(false);
//           return;
//         }

//         const encodedEmail = encodeURIComponent(email);

//         const response = await axios.get(`http://localhost:5000/api/expenses/${encodedEmail}`);
//         setExpenses(response.data);
//       } catch (error) {
//         console.error('Error fetching expenses:', error);
//         setError('Failed to fetch expenses');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExpenses();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//         <Navbar />
//       <h1>Your Expenses</h1>
//       <ul>
//         {expenses.map((expense, index) => (
//           <li key={index}>
//             {expense.date}: {expense.category} - ${expense.amount}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Expenses;


function Expenses() {
  return(
    <div>
      <Navbar />
      <h1>Expenses</h1>
    </div>
  );
}

export default Expenses;
