"use client"; // บอกว่า component นี้รันบน client-side

import { Toaster } from "react-hot-toast"; // นำเข้า Toaster จาก react-hot-toast สำหรับการแสดงการแจ้งเตือน

// ฟังก์ชัน ToasterProvider สำหรับแสดงการแจ้งเตือน (toast notifications)
export const ToasterProvider = () => {
  return <Toaster />; // แสดง Toaster component เพื่อให้สามารถแสดงการแจ้งเตือนในแอปพลิเคชัน
};
