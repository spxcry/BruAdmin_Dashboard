// ใช้คำสั่ง "use client" เพื่อบอกว่า component นี้รันบน client-side
'use client';

// นำเข้า React และ component ที่จำเป็นจาก chart.js และ react-chartjs-2
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// นำเข้า component ที่ใช้แสดงจำนวนสินค้า, คอลเลคชั่น, ลูกค้า
import TotalProduct from '@/components/products/TotalProduct';
import TotalCollection from '@/components/collections/TotalCollection';
import TotalCustomer from '@/components/customers/TotalCustomer';

// Register Chart.js components เพื่อให้สามารถใช้งานได้
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// ฟังก์ชันหลัก Dashboard
const Dashboard = () => {
  
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

  // การแสดงผลหน้า Dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <p className="text-heading3-bold text-gray-800">หน้าหลัก</p> {/* หัวข้อหน้า */}
      <hr className="border-t-2 border-gray-300 my-6" /> {/* เส้นแบ่ง */}
      
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <TotalCollection /> {/* แสดงจำนวนคอลเลคชั่น */}
        <TotalCustomer /> {/* แสดงจำนวนลูกค้า */}
        <TotalProduct /> {/* แสดงจำนวนสินค้า */}
      </div>
      
      <div className="bg-white shadow-xl rounded-lg p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">การขาย, สินค้า, ลูกค้า</h3> {/* หัวข้อกราฟ */}
        <div className="w-full" style={{ height: '465px' }}> {/* กำหนดความสูงให้กราฟ */}
          {/* กราฟเส้นสำหรับแสดงข้อมูลการขาย, สินค้า, ลูกค้า */}
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
      </div>
    </div>
  );
};

// ส่งออก component Dashboard
export default Dashboard;
