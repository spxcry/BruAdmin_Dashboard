// นำเข้า type Metadata จาก next
import type { Metadata } from "next";
// นำเข้า font Inter จาก next/font/google
import { Inter } from "next/font/google";
// นำเข้าไฟล์ CSS ทั่วไป
import "../globals.css";
// นำเข้า ClerkProvider จาก @clerk/nextjs
import { ClerkProvider } from "@clerk/nextjs";
// นำเข้า LeftSideBar และ TopBar จาก components/layout
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
// นำเข้า Toaster จาก react-hot-toast สำหรับแสดงการแจ้งเตือน
import { Toaster } from "react-hot-toast";


// กำหนดค่า font Inter ที่ใช้ subset ภาษา latin
const inter = Inter({ subsets: ["latin"] });

// กำหนดค่า metadata สำหรับหน้าเว็บ
export const metadata: Metadata = {
  title: "BRU ADMIN", // ชื่อหน้าเว็บ
  description: "Admin dashboard to manage Bru data", // คำอธิบายของหน้าเว็บ
};

// ฟังก์ชัน RootLayout ที่ใช้ในการจัด layout หลักของแอปพลิเคชัน
export default function RootLayout({
  children, // รับ prop children ที่เป็น ReactNode
}: Readonly<{
  children: React.ReactNode; // กำหนดประเภทของ children เป็น ReactNode
}>) {
  return (
    // ใช้ ClerkProvider ในการจัดการ authentication
    <ClerkProvider>
      {/* กำหนดภาษาใน tag html */}
      <html lang="en">
        {/* body ของ layout ที่ใช้ className ของ font Inter */}
        <body className={inter.className}>
          {/* แสดง Toaster สำหรับแจ้งเตือน */}
          <Toaster />
          {/* กำหนด layout หลักโดยใช้ flex */}
          <div className="flex max-lg:flex-col text-gray-1">
            {/* แถบด้านข้างซ้าย */}
            <LeftSideBar />
            {/* แถบด้านบน */}
            <TopBar />
            {/* เนื้อหาหลักของหน้า */}
            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
