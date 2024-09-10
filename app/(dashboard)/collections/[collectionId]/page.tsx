// ใช้คำสั่ง "use client" เพื่อบอกว่า component นี้รันบน client-side
"use client";

// นำเข้า component Loader จาก custom UI
import Loader from '@/components/custom ui/Loader';
// นำเข้า component CollectionForm จาก collections
import CollectionForm from '@/components/collections/CollectionForm';
// นำเข้า React และ hooks useEffect, useState
import React, { useEffect, useState } from 'react';


// ฟังก์ชัน CollectionDetails ที่รับ prop params ซึ่งมี collectionId
const CollectionDetails = ({ params }: { params: { collectionId: string }}) => {
  // สร้าง state loading เริ่มต้นเป็น true
  const [loading, setLoading] = useState(true);

  // สร้าง state collectionDetails เริ่มต้นเป็น null
  const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null);

  // ฟังก์ชันสำหรับดึงข้อมูล collection โดยใช้ collectionId ที่ได้รับจาก params
  const getCollectionDetails = async () => {
    try { 
      // เรียก API เพื่อดึงข้อมูล collection จาก server
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET"
      });
      const data = await res.json();
      
      // กรองข้อมูลที่ไม่ต้องการออกจาก data
      const { price, expense, category, tags, colors, sizes, ...filteredData } = data;
      
      // อัพเดต state collectionDetails ด้วยข้อมูลที่ถูกกรอง
      setCollectionDetails(filteredData);

      // ปิดการโหลดหลังจากข้อมูลถูกดึงมาแล้ว
      setLoading(false);
    } catch (err) {
      // แสดง error ในกรณีที่เกิดปัญหา
      console.log("[collectionId_GET]", err);
    }
  };

  // ใช้ useEffect เพื่อเรียกฟังก์ชัน getCollectionDetails เมื่อ component ถูก mount
  useEffect(() => {
    getCollectionDetails();
  }, []);

  // ถ้ายังโหลดอยู่ แสดง Loader component; ถ้าไม่โหลดแล้ว แสดง CollectionForm พร้อมข้อมูลที่ดึงมา
  return loading ? <Loader /> : (
    <CollectionForm initialData={collectionDetails} />
  );
};

// export ฟังก์ชัน CollectionDetails เป็น default
export default CollectionDetails;
