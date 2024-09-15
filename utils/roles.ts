"use client"; // บอกว่า component นี้รันบน client-side

import { Roles } from "./globals"; // นำเข้า Roles type จากไฟล์ globals
import { useUser } from "@clerk/nextjs"; // นำเข้า useUser จาก @clerk/nextjs สำหรับการดึงข้อมูลผู้ใช้

// ฟังก์ชัน usecheckRole สำหรับตรวจสอบบทบาทของผู้ใช้
export const usecheckRole = (role: Roles) => {
  const { user } = useUser(); // ใช้ useUser เพื่อดึงข้อมูลผู้ใช้

  // ตรวจสอบว่า role ของผู้ใช้ตรงกับบทบาทที่ส่งเข้ามาหรือไม่
  return user?.publicMetadata?.role === role;
};
