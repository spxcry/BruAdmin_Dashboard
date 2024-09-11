import React, { useEffect, useState } from 'react'; // นำเข้า React และ hooks ที่ใช้ คือ useEffect และ useState


// สร้างฟังก์ชันคอมโพเนนต์ TotalProduct
const TotalProduct = () => {
  // ใช้ useState สำหรับเก็บจำนวนสินค้าทั้งหมด และ error ถ้ามีข้อผิดพลาด
  const [totalProducts, setTotalProducts] = useState<number | null>(null); // เก็บจำนวนสินค้าทั้งหมด
  const [error, setError] = useState<string | null>(null); // เก็บข้อความข้อผิดพลาด

  // ใช้ useEffect เพื่อเรียกฟังก์ชัน fetchProducts เมื่อคอมโพเนนต์ mount
  useEffect(() => {
    // ฟังก์ชัน async สำหรับดึงข้อมูลสินค้าจาก API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products'); // เรียก API สำหรับดึงข้อมูลสินค้า
        if (!response.ok) { // ตรวจสอบถ้า response ไม่โอเค
          throw new Error('เรียกข้อมูลสินค้าไม่สำเร็จ'); // โยน error ถ้าเกิดปัญหา
        }
        const data = await response.json(); // แปลง response เป็น JSON
        setTotalProducts(data.products.length); // อัปเดต state ด้วยจำนวนสินค้าทั้งหมด
      } catch (err) {
        // ตรวจสอบว่า error ที่เกิดขึ้นเป็น instance ของ Error หรือไม่
        if (err instanceof Error) {
          setError(err.message); // อัปเดต state error ด้วยข้อความข้อผิดพลาด
        } else {
          setError('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'); // แสดงข้อความ error ถ้าไม่ทราบสาเหตุ
        }
      }
    };

    fetchProducts(); // เรียกฟังก์ชัน fetchProducts เมื่อคอมโพเนนต์ mount
  }, []); // useEffect จะทำงานแค่ครั้งเดียวเมื่อคอมโพเนนต์ mount

  // ถ้ามี error จะแสดงข้อความ error
  if (error) {
    return <p>Error: {error}</p>; // แสดงข้อความ error ที่เกิดขึ้น
  }

  // แสดงผล UI
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold">สินค้าทั้งหมด</h3> {/* แสดงหัวข้อ */}
      <div className="text-3xl font-bold mt-2">
        {totalProducts !== null ? totalProducts : 'Loading...'} {/* แสดงจำนวนสินค้าหรือคำว่า Loading ขณะรอ */}
      </div>
    </div>
  );
};

export default TotalProduct; // ส่งออกคอมโพเนนต์ TotalProduct เพื่อให้สามารถใช้ในที่อื่นได้