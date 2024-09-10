// บอกว่า component นี้รันบน client-side
"use client";

// นำเข้า component Loader จาก custom UI เพื่อแสดงขณะรอข้อมูล
import Loader from '@/components/custom ui/Loader';
// นำเข้า component CustomerForm จาก customers สำหรับแสดงฟอร์มข้อมูลลูกค้า
import CustomerForm from '@/components/customers/CustomerForm';
// นำเข้า React และ hooks useEffect, useState เพื่อจัดการ state และ side effects
import React, { useEffect, useState } from 'react';


// ฟังก์ชัน CustomerDetails รับ prop params ที่มี customerId เพื่อใช้ดึงข้อมูลลูกค้า
const CustomerDetails = ({ params }: { params: { customerId: string }}) => {
  
  // สร้าง state loading เพื่อจัดการสถานะการโหลดข้อมูล เริ่มต้นที่ true
  const [loading, setLoading] = useState(true);

  // สร้าง state customerDetails เพื่อเก็บข้อมูลลูกค้า เริ่มต้นเป็น null
  const [customerDetails, setCustomerDetails] = useState<CustomerType | null>(null);

  // ฟังก์ชันสำหรับดึงข้อมูลลูกค้า โดยใช้ customerId ที่ได้รับจาก params
  const getCustomerDetails = async () => {
    try { 
      // เรียก API เพื่อนำข้อมูลลูกค้าจาก server มาใช้
      const res = await fetch(`/api/customers/${params.customerId}`, {
        method: "GET"
      });
      
      // แปลง response ที่ได้เป็น JSON แล้วเก็บไว้ในตัวแปร data
      const data = await res.json();

      // ตั้งค่า customerDetails ด้วยข้อมูลที่ดึงมา
      setCustomerDetails(data);

      // ตั้งค่า loading เป็น false หลังจากข้อมูลถูกดึงมาเสร็จสิ้น
      setLoading(false);
    } catch (err) {
      // แสดง error ในกรณีที่การดึงข้อมูลล้มเหลว
      console.log("[customerId_GET]", err);
    }
  };

  // ใช้ useEffect เพื่อเรียกฟังก์ชัน getCustomerDetails เมื่อ component ถูก mount ครั้งแรก
  useEffect(() => {
    getCustomerDetails();
  }, []);

  // ถ้า loading เป็น true ให้แสดง Loader component; ถ้า loading เสร็จแล้วให้แสดง CustomerForm พร้อมข้อมูล
  return loading ? <Loader /> : (
    <CustomerForm initialData={customerDetails} />
  );
};

// export ฟังก์ชัน CustomerDetails เป็น default เพื่อให้สามารถเรียกใช้ที่อื่นได้
export default CustomerDetails;