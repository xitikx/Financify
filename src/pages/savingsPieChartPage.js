import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function SavingsPieChartPage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) {
          return;
        }

        const encodedEmail = encodeURIComponent(email);
        const response = await axios.get(`http://localhost:5000/api/user/${encodedEmail}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const data = {
    labels: userData?.savingsDetails?.map(detail => detail.category) || [],
    datasets: [
      {
        data: userData?.savingsDetails?.map(detail => parseFloat(detail.amount)) || [],
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
      },
    ],
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Savings Breakdown</h2>
      <div className="pie-chart">
        <Pie data={data} />
      </div>
      <button onClick={handleBack} className="back-button">
        Back to Dashboard
      </button>
    </div>
  );
}

export default SavingsPieChartPage;
