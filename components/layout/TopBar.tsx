"use client"; // บอกว่า component นี้รันบน client-side

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image"; 
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"; 
import { Menu } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { usecheckRole } from "@/utils/roles";


// ฟังก์ชัน TopBar สำหรับแสดงแถบเมนูด้านบนของแอป
const TopBar = () => {
  const { user } = useUser(); // ใช้ useUser เพื่อดึงข้อมูลผู้ใช้ปัจจุบัน
  const isAdmin = usecheckRole("admin"); // ตรวจสอบว่าผู้ใช้เป็น admin หรือไม่

  const [dropdownMenu, setDropdownMenu] = useState(false); // สร้าง state สำหรับจัดการ dropdown เมนู
  const pathname = usePathname(); // ดึงเส้นทาง URL ปัจจุบัน
  
  return (
    // แสดงแถบเมนูด้านบนแบบ sticky
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-gradient-to-b from-purple-500 to-pink-400 shadow-lg text-white lg:hidden">
      {/* แสดงโลโก้ */}
      <Image src="/logo.png" alt="logo" width={150} height={70} />

      {/* แสดงเมนูนำทางสำหรับหน้าจอขนาดใหญ่ */}
      <div className="flex gap-8 max-md:hidden">
        {navLinks
          .filter((link) => link.label !== "Customers" || isAdmin) // กรองลิงก์ ถ้าไม่ใช่ admin จะไม่แสดง "Customers"
          .map((link) => (
            <Link
              href={link.url} // เส้นทาง URL ที่ลิงก์ไป
              key={link.label} // กำหนด key สำหรับแต่ละลิงก์
              className={`flex items-center gap-4 text-body-medium ${
                pathname === link.url ? "text-white font-semibold bg-purple-600" : "text-pink-200"
              } hover:bg-purple-700 hover:text-white p-2 rounded-lg transition-all duration-300 shadow-md`} // สไตล์เมนู
            >
              <p>{link.label}</p> {/* ป้ายข้อความของลิงก์ */}
            </Link>
          ))}
      </div>

      {/* เมนูแบบ dropdown สำหรับหน้าจอขนาดเล็ก */}
      <div className="relative flex gap-4 items-center">
        <Menu
          className="cursor-pointer md:hidden" // สไตล์ไอคอนเมนู
          onClick={() => setDropdownMenu(!dropdownMenu)} // คลิกเพื่อเปิด/ปิด dropdown เมนู
        />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-gradient-to-b from-purple-500 to-pink-400 shadow-lg rounded-lg text-white">
            {navLinks
              .filter((link) => link.label !== "Customers" || isAdmin) // กรองลิงก์ ถ้าไม่ใช่ admin จะไม่แสดง "Customers"
              .filter((link) => link.label !== "Orders") // กรองลิงก์ "Orders" ออก
              .map((link) => (
                <Link
                  href={link.url} // เส้นทาง URL ที่ลิงก์ไป
                  key={link.label} // กำหนด key สำหรับแต่ละลิงก์
                  className="flex items-center gap-4 text-body-medium hover:bg-purple-700 hover:text-white p-2 rounded-lg transition-all duration-300" // สไตล์เมนู
                >
                  {link.icon} <p>{link.label}</p> {/* แสดงไอคอนและป้ายของลิงก์ */}
                </Link>
              ))}
          </div>
        )}
        <UserButton /> {/* แสดงปุ่มผู้ใช้ */}
        <p className="text-sm text-pink-200">Edit Profile</p> {/* ปุ่มแก้ไขโปรไฟล์ */}
      </div>
    </div>
  );
};

export default TopBar; // ส่งออกฟังก์ชัน TopBar เป็น default
