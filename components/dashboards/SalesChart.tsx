// components/SalesChart.tsx
'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components เพื่อให้สามารถใช้งานได้
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
  // ข้อมูลกราฟการขาย, สินค้า, ลูกค้า
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // ชื่อเดือน
    datasets: [
      {
        label: 'การขาย (฿)', // ข้อมูลการขาย
        data: [0, 50, 200, 150, 100, 0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgba(75, 192, 192, 1)', // สีเส้นกราฟ
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // สีพื้นหลังกราฟ
        tension: 0.4, // ความโค้งของเส้น
      },
      {
        label: 'สินค้า', // ข้อมูลสินค้า
        data: [10, 30, 150, 100, 80, 20, 50, 90, 60, 120, 130, 110],
        borderColor: 'rgba(255, 99, 132, 1)', // สีเส้นกราฟ
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // สีพื้นหลังกราฟ
        tension: 0.4, // ความโค้งของเส้น
      },
      {
        label: 'ลูกค้า', // ข้อมูลลูกค้า
        data: [5, 20, 40, 60, 30, 90, 50, 120, 80, 100, 130, 140],
        borderColor: 'rgba(54, 162, 235, 1)', // สีเส้นกราฟ
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // สีพื้นหลังกราฟ
        tension: 0.4, // ความโค้งของเส้น
      },
    ],
  };

  return (
    <div className="w-full" style={{ height: '465px' }}> {/* กำหนดความสูงให้กราฟ */}
      <Line data={salesData} options={{
        responsive: true,
        maintainAspectRatio: false, // ทำให้กราฟไม่ต้องรักษาอัตราส่วน
        plugins: {
          legend: {
            position: 'top', // ตำแหน่งของ legend
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // สีพื้นหลัง tooltip
            titleColor: '#fff', // สีของหัวข้อ tooltip
            bodyColor: '#fff', // สีของข้อมูลใน tooltip
            borderColor: 'rgba(255, 255, 255, 0.3)', // สีขอบของ tooltip
            borderWidth: 1, // ความกว้างของขอบ tooltip
          },
        },
        scales: {
          x: {
            grid: {
              display: false, // ไม่แสดงเส้นกริดแนวแกน x
            },
          },
          y: {
            grid: {
              color: 'rgba(200, 200, 200, 0.3)', // สีเส้นกริดแนวแกน y
            },
          },
        },
      }} />
    </div>
  );
};

export default SalesChart;
