import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/Dashboard.css';
import Modal from '../components/Modal';
import PieChart from '../components/PieChart';
import Header from '../components/Header';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [formData, setFormData] = useState({
    category: '',
    amount: 0,
  });

  const categories = {
    income: ['Salary', 'Real Estate', 'Stocks'],
    expenses: ['Food', 'Travel', 'Entertainment', 'Rent'],
    savings: ['Emergency Fund', 'Retirement', 'Vacation'],
    investments: ['Stocks', 'Bonds', 'Real Estate'],
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem('email'); // Get email from localStorage
        if (!email) {
          setError('No email found in localStorage');
          setLoading(false);
          return;
        }

        const encodedEmail = encodeURIComponent(email); // Encode the email for URL
        const response = await axios.get(`http://localhost:5000/api/user/${encodedEmail}`);
        setUserData(response.data);
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    console.log('Form Data before Save:', formData); // Debugging log

    let updatedData = { ...userData }; // Start with the current user data

    // Parse the amount as a float
    const amount = parseFloat(formData.amount);

    // Determine which field to update based on the category
    if (categories.income.includes(formData.category)) {
      updatedData.income = (parseFloat(updatedData.income || 0) + amount).toFixed(2);
    } else if (categories.expenses.includes(formData.category)) {
      updatedData.expenses = (parseFloat(updatedData.expenses || 0) + amount).toFixed(2);
    } else if (categories.savings.includes(formData.category)) {
      updatedData.savings = (parseFloat(updatedData.savings || 0) + amount).toFixed(2);
    } else if (categories.investments.includes(formData.category)) {
      updatedData.investments = (parseFloat(updatedData.investments || 0) + amount).toFixed(2);
    } else {
      console.error('Invalid category:', formData.category);
      return;
    }

    console.log('Updated Data to send to backend:', updatedData);

    try {
      const email = localStorage.getItem('email');
      if (!email) {
        console.error('No email found in localStorage');
        return;
      }

      const encodedEmail = encodeURIComponent(email);

      // Send the updated data to the backend
      const response = await axios.put(`http://localhost:5000/api/user/${encodedEmail}`, updatedData);
      console.log('Data updated successfully:', response.data);

      // Update the frontend state with the new data
      setUserData(updatedData);

      closeModal();
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Failed to update data');
    }
  };

  const openModal = (type) => {
    let modalInfo;
    switch (type) {
      case 'income':
        modalInfo = { type: 'Income', categories: categories.income };
        break;
      case 'expenses':
        modalInfo = { type: 'Expenses', categories: categories.expenses };
        break;
      case 'savings':
        modalInfo = { type: 'Savings', categories: categories.savings };
        break;
      case 'investments':
        modalInfo = { type: 'Investments', categories: categories.investments };
        break;
      default:
        modalInfo = { type: 'Unknown', categories: [] };
    }
    setModalData(modalInfo);
    setFormData({ category: '', amount: 0 });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Error: Unable to fetch user data.</div>;
  }

  const income = parseFloat(userData.income || 0);
  const expenses = parseFloat(userData.expenses || 0);
  const savings = parseFloat(userData.savings || 0);
  const investments = parseFloat(userData.investments || 0);

  return (
    <div className="dashboard">
      <Header />
      <h1 className="heading">Hello, {userData.name || 'User'}!</h1>
      <div className="financial-overview">
        <h2>Your Financial Overview</h2>
        <PieChart income={income} expenses={expenses} savings={savings} investments={investments} />
      </div>
      <div className="buttons">
        <button onClick={() => openModal('income')} className="button-income">
          Add Income
        </button>
        <button onClick={() => openModal('expenses')} className="button-expenses">
          Add Expenses
        </button>
        <button onClick={() => openModal('savings')} className="button-savings">
          Add Savings
        </button>
        <button onClick={() => openModal('investments')} className="button-investments">
          Add Investments
        </button>
      </div>

      {showModal && (
        <Modal
          title={`${modalData.type} Details`}
          formData={formData}
          setFormData={setFormData}
          categories={modalData.categories}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Dashboard;
