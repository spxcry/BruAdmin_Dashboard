import React, { useEffect, useState } from 'react';

// Component ที่ใช้สำหรับแสดงจำนวนลูกค้าทั้งหมด
const TotalCustomers = () => {
  // ใช้ useState เพื่อเก็บจำนวนลูกค้าทั้งหมด โดยเริ่มต้นเป็น null
  const [totalCustomers, setTotalCustomers] = useState<number | null>(null);
  // ใช้ useState เพื่อเก็บข้อความข้อผิดพลาด ในกรณีที่เกิดข้อผิดพลาดในการดึงข้อมูล
  const [error, setError] = useState<string | null>(null);

  // useEffect ใช้ในการดึงข้อมูลจาก API เมื่อ component ถูก mount
  useEffect(() => {
    // ฟังก์ชัน async สำหรับดึงข้อมูลลูกค้าจาก API
    const fetchCustomers = async () => {
      try {
        // ส่งคำร้องขอข้อมูลไปยัง endpoint '/api/customers'
        const response = await fetch('/api/customers');
        // ตรวจสอบว่าการตอบสนองจาก API สำเร็จหรือไม่ (สถานะ 200)
        if (!response.ok) {
          // ถ้าไม่สำเร็จ ให้โยนข้อผิดพลาด
          throw new Error('Failed to fetch customers');
        }
        // แปลงข้อมูลที่ได้จาก API เป็น JSON
        const data = await response.json();
        
        // ตั้งค่า totalCustomers ด้วยข้อมูลที่ได้จาก API
        setTotalCustomers(data.totalCustomers);
        
      } catch (err) {
        // ถ้าเกิดข้อผิดพลาด ให้ตรวจสอบว่าเป็น Error จริงหรือไม่
        if (err instanceof Error) {
          // เก็บข้อความข้อผิดพลาดไว้ใน state
          setError(err.message);
        } else {
          // ถ้าไม่ใช่ข้อผิดพลาดที่ทราบสาเหตุ ให้แสดงข้อความทั่วไป
          setError('An unknown error occurred');
        }
      }
    };

    // เรียกใช้ฟังก์ชัน fetchCustomers เมื่อ component ถูก mount
    fetchCustomers();
  }, []); // ใช้ [] เพื่อให้ฟังก์ชันนี้รันแค่ครั้งเดียวตอน mount

  // ถ้ามีข้อผิดพลาดเกิดขึ้น ให้แสดงข้อความข้อผิดพลาด
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    // UI สำหรับแสดงจำนวนลูกค้าหรือแสดงข้อความ 'Loading...' ขณะกำลังโหลดข้อมูล
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold">ลูกค้าติดแบล็คลิสต์ทั้งหมด</h3>
      <div className="text-3xl font-bold mt-2">
        {/* แสดงจำนวนลูกค้า ถ้ามีข้อมูล ถ้าไม่แสดง Loading... */}
        {totalCustomers !== null ? totalCustomers : 'Loading...'}
      </div>
    </div>
  );
};

// ส่งออก component TotalCustomers เพื่อใช้ในที่อื่น
export default TotalCustomers;