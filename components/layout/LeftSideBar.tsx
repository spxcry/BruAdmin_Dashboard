"use client"; // บอกว่า component นี้รันบน client-side

import { UserButton, useUser } from "@clerk/nextjs"; // นำเข้า UserButton และ useUser จาก @clerk/nextjs สำหรับการจัดการผู้ใช้
import Image from "next/image"; // นำเข้า Image component จาก next/image สำหรับการแสดงรูปภาพ
import Link from "next/link"; // นำเข้า Link จาก next/link สำหรับการนำทางภายในแอป
import { usePathname } from "next/navigation"; // นำเข้า usePathname สำหรับการดึงเส้นทาง URL ปัจจุบัน
import { navLinks } from "@/lib/constants"; // นำเข้า navLinks จาก constants สำหรับแสดงลิงก์นำทาง
import { usecheckRole } from "@/utils/roles"; // นำเข้า usecheckRole จาก roles สำหรับตรวจสอบบทบาทของผู้ใช้

// ฟังก์ชัน LeftSideBar สำหรับแสดงแถบด้านข้างของแอป
const LeftSideBar = () => {
  const { user } = useUser(); // ใช้ useUser เพื่อดึงข้อมูลผู้ใช้ปัจจุบัน
  const isAdmin = usecheckRole("admin"); // ตรวจสอบว่าผู้ใช้เป็น admin หรือไม่

  const pathname = usePathname(); // ดึงเส้นทาง URL ปัจจุบัน

  return (
    // ส่วนของแถบด้านข้าง
    <div className="h-screen left-0 top-0 sticky p-8 flex flex-col gap-10 bg-gradient-to-b from-purple-500 to-pink-400 shadow-xl max-lg:hidden text-white">
      {/* ส่วนของโลโก้ */}
      <div className="flex justify-center items-center mb-8">
        <Image
          src="/logo.png" // เส้นทางของรูปภาพโลโก้
          alt="logo" // ข้อความแสดงแทนถ้ารูปภาพไม่แสดง
          width={180} // กำหนดความกว้างของรูปภาพ
          height={80} // กำหนดความสูงของรูปภาพ
          className="rounded-lg shadow-lg" // เพิ่มสไตล์รูปภาพ
        />
      </div>

      {/* ส่วนของเมนูนำทาง */}
      <nav className="flex flex-col gap-6">
        {navLinks
          .filter((link) => link.label !== "Customers" || isAdmin) // กรองลิงก์ ถ้าไม่ใช่ admin จะไม่แสดง "Customers"
          .map((link) => (
            <Link
              href={link.url} // เส้นทาง URL ที่ลิงก์ไป
              key={link.label} // กำหนด key สำหรับแต่ละลิงก์
              className={`flex items-center gap-4 text-lg font-medium ${
                pathname === link.url // ตรวจสอบว่าเส้นทาง URL ตรงกับลิงก์หรือไม่
                  ? "text-white font-semibold bg-purple-600" // ถ้าใช่ให้เพิ่มสไตล์นี้
                  : "text-pink-200" // ถ้าไม่ใช่ให้ใช้สไตล์นี้
              } hover:bg-purple-700 hover:text-white p-3 rounded-md transition-all duration-300 shadow-md`} // สไตล์เมื่อ hover
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }} // เพิ่มเงาให้กับข้อความ
            >
              {link.icon} <span>{link.label}</span> {/* แสดงไอคอนและป้ายของลิงก์ */}
            </Link>
          ))}
      </nav>

      {/* ส่วนของปุ่มผู้ใช้และแก้ไขโปรไฟล์ */}
      <div className="flex gap-4 items-center mt-auto">
        <UserButton /> {/* แสดงปุ่มผู้ใช้ */}
        <p
          className="text-sm text-pink-200 cursor-pointer hover:text-white transition-all duration-300" // สไตล์ของข้อความ "Edit Profile"
          style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }} // เพิ่มเงาให้กับข้อความ
        >
          Edit Profile {/* ข้อความแสดงปุ่มแก้ไขโปรไฟล์ */}
        </p>
      </div>
    </div>
  );
};

export default LeftSideBar; // ส่งออกฟังก์ชัน LeftSideBar เป็น default
