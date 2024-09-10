// ใช้คำสั่ง "use client" เพื่อบอกว่า component นี้รันบน client-side
"use client";

// นำเข้า component Loader จาก custom UI
import Loader from '@/components/custom ui/Loader';
// นำเข้า component ProductForm จาก products
import ProductForm from '@/components/products/ProductForm';
// นำเข้า React และ hooks useEffect, useState
import React, { useEffect, useState } from 'react';


// ฟังก์ชัน ProductDetails ที่รับ prop params ซึ่งมี productId
const ProductDetails = ({ params }: { params: { productId: string }}) => {
  
  // สร้าง state loading เริ่มต้นเป็น true
  const [loading, setLoading] = useState(true);

  // สร้าง state productDetails เริ่มต้นเป็น null
  const [productDetails, setProductDetails] = useState<ProductType | null>(null);

  // ฟังก์ชันสำหรับดึงข้อมูล product โดยใช้ productId ที่ได้รับจาก params
  const getProductDetails = async () => {
    try { 
      // เรียก API เพื่อดึงข้อมูล product จาก server
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET"
      });
      
      // แปลง response ที่ได้เป็น JSON แล้วเก็บไว้ในตัวแปร productDetails
      const data = await res.json();
      setProductDetails(data);

      // ปิดการโหลดหลังจากข้อมูลถูกดึงมาแล้ว
      setLoading(false);
    } catch (err) {
      // แสดง error ในกรณีที่เกิดปัญหา
      console.log("[productId_GET]", err);
    }
  };

  // ใช้ useEffect เพื่อเรียกฟังก์ชัน getProductDetails เมื่อ component ถูก mount
  useEffect(() => {
    getProductDetails();
  }, []);

  // ถ้ายังโหลดอยู่ แสดง Loader component; ถ้าไม่โหลดแล้ว แสดง ProductForm พร้อมข้อมูลที่ดึงมา
  return loading ? <Loader /> : (
    <ProductForm initialData={productDetails} />
  );
};

// export ฟังก์ชัน ProductDetails เป็น default
export default ProductDetails;
