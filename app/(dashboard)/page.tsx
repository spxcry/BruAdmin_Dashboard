// pages/dashboard.tsx
'use client';

import React from 'react';
// นำเข้า SalesChart component ที่สร้างใหม่
import SalesChart from '@/components/dashboards/SalesChart';
// นำเข้า component ที่ใช้แสดงจำนวนสินค้า, คอลเลคชั่น, ลูกค้า
import TotalProduct from '@/components/products/TotalProduct';
import TotalCollection from '@/components/collections/TotalCollection';
import TotalCustomer from '@/components/customers/TotalCustomer';

// ฟังก์ชันหลัก Dashboard
const Dashboard = () => {
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
        {/* นำ SalesChart component มาแสดงแทนข้อมูลการขาย */}
        <SalesChart />
      </div>
    </div>
  );
};

// ส่งออก component Dashboard
export default Dashboard;
