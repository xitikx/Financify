// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// // Register the plugins
// ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// function PieChart({ income, expenses, savings, investments }) {
//   // Calculate percentages
//   const data = {
//     labels: ['Expenses', 'Savings', 'Investments'],
//     datasets: [
//       {
//         data: [
//           (expenses / income) * 100, // Percentage of income for expenses
//           (savings / income) * 100, // Percentage of income for savings
//           (investments / income) * 100, // Percentage of income for investments
//         ],
//         backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
//       },
//     ],
//   };

//   // Chart options
//   const options = {
//     plugins: {
//       datalabels: {
//         formatter: (value, context) => {
//           const total = income; // Total income is the base
//           const actualAmount = (value / 100) * total; // Calculate the actual amount
//           return `${value.toFixed(2)}%(${actualAmount.toFixed(2)})`; // Format as percentage and actual amount
//         },
//         color: 'white', // Text color for the labels
//         font: {
//           weight: 'bold',
//           size: 14,
//         },
//         anchor: 'center', // Position the label at the center of the slice
//       },
//     },
//   };

//   return (
//     <div className="pie-chart">
//       <Pie data={data} options={options} />
//     </div>
//   );
// }

// export default PieChart;


import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE'];

function CustomPieChart({ income, expenses, savings, investments }) {
  const data = [
    { name: 'Income', value: income },
    { name: 'Expenses', value: expenses },
    { name: 'Savings', value: savings },
    { name: 'Investments', value: investments },
  ];

  const renderCustomizedLabel = ({ x, y, value, name, percent }) => {
    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: '12px', fontWeight: 'bold' }}
      >
        {`${name}: ${percent.toFixed(1)}% (${value.toLocaleString()})`}
      </text>
    );
  };

  return (
    <div style={{ width: '100%', height: '300px', margin: '0 auto' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomPieChart;