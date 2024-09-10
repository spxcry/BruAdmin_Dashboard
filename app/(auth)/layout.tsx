// นำเข้า type Metadata จาก next
import type { Metadata } from "next";
// นำเข้า font Inter จาก next/font/google
import { Inter } from "next/font/google";
// นำเข้าไฟล์ CSS ทั่วไป
import "../globals.css";
// นำเข้า ClerkProvider จาก @clerk/nextjs
import { ClerkProvider } from "@clerk/nextjs";


// กำหนดค่า font Inter ที่ใช้ subset ภาษา latin
const inter = Inter({ subsets: ["latin"] });
// กำหนดค่า metadata สำหรับหน้าเว็บ
export const metadata: Metadata = {
  title: "Bru - Admin Auth", // ชื่อหน้าเว็บ
  description: "Admin dashboard to manage Bru's data", // คำอธิบายของหน้าเว็บ
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
      <html lang="en">
        <body className={inter.className}>
          {/* จัด layout โดยมี margin-left เป็น 55px */}
          <div className="ml-[55]">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}