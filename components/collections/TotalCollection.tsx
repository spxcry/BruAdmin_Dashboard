import React, { useEffect, useState } from "react"; // นำเข้า React และ hooks useEffect, useState

// ฟังก์ชัน TotalCollections สำหรับแสดงจำนวนคอลเลคชั่นทั้งหมด
const TotalCollections = () => {
  // สร้าง state totalCollections เพื่อเก็บจำนวนคอลเลคชั่นทั้งหมด เริ่มต้นเป็น null
  const [totalCollections, setTotalCollections] = useState<number | null>(null);
  
  // สร้าง state error เพื่อเก็บข้อความเมื่อเกิดข้อผิดพลาด เริ่มต้นเป็น null
  const [error, setError] = useState<string | null>(null);

  // ใช้ useEffect เพื่อดึงข้อมูลคอลเลคชั่นเมื่อ component ถูก mount
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // เรียก API เพื่อดึงข้อมูลคอลเลคชั่น
        const response = await fetch("/api/collections");
        if (!response.ok) {
          throw new Error("Failed to fetch collections"); // ถ้าดึงข้อมูลไม่สำเร็จ ให้แสดงข้อผิดพลาด
        }
        const data = await response.json();

        // ตรวจสอบว่ามีข้อมูล totalCollections ใน response
        if (data.totalCollections !== undefined) {
          setTotalCollections(data.totalCollections); // ตั้งค่า totalCollections
        } else {
          throw new Error(
            "Total collections data is missing from the response"
          ); // ถ้าไม่มีข้อมูล totalCollections ให้แสดงข้อผิดพลาด
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // แสดงข้อความข้อผิดพลาด
        } else {
          setError("An unknown error occurred"); // แสดงข้อผิดพลาดทั่วไป
        }
      }
    };

    fetchCollections(); // เรียกฟังก์ชัน fetchCollections เมื่อ component ถูก mount ครั้งแรก
  }, []);

  // ถ้ามีข้อผิดพลาด ให้แสดงข้อความข้อผิดพลาด
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    // แสดงจำนวนคอลเลคชั่นทั้งหมด
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold">คอลเลคชั่นทั้งหมด</h3>
      <div className="text-3xl font-bold mt-2">
        {totalCollections !== null ? totalCollections : "Loading..."} {/* ถ้ามีข้อมูลแล้วให้แสดง ถ้าไม่มีกำลังโหลด */}
      </div>
    </div>
  );
};

// export component TotalCollections เป็น default
export default TotalCollections;
