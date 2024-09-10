// ใช้คำสั่ง "use client" เพื่อบอกว่า component นี้รันบน client-side
"use client";

// นำเข้า useRouter จาก next/navigation เพื่อใช้ในการนำทาง
import { useRouter } from "next/navigation";
// นำเข้า useEffect และ useState จาก React เพื่อจัดการ state และ side effects
import { useEffect, useState } from "react";
// นำเข้า component Loader จาก custom UI เพื่อแสดงขณะรอข้อมูล
import Loader from "@/components/custom ui/Loader";
// นำเข้า component Button จาก UI เพื่อใช้เป็นปุ่ม
import { Button } from "@/components/ui/button";
// นำเข้า icon Plus จาก lucide-react เพื่อใช้ในปุ่ม
import { Plus } from "lucide-react";
// นำเข้า component Input จาก UI เพื่อใช้เป็น input สำหรับค้นหา
import { Input } from "@/components/ui/input";


// กำหนดประเภทของสินค้า
interface ProductType {
  _id: string;
  title: string;
  sum: number;
  media: string[];
  category: string;
}

// การ์ดแสดงข้อมูลสินค้า
const ProductCard = ({ product }: { product: ProductType }) => {
  const sum = product.sum || 0; // ตรวจสอบให้แน่ใจว่า sum เป็นตัวเลขที่ถูกต้อง
  const isOutOfStock = sum === 0; // ตรวจสอบว่าหมดสต็อกหรือไม่
  const isPositiveStock = sum > 0; // ตรวจสอบว่าสินค้ามีสต็อกหรือไม่

  const quantityLabel = `คงเหลือ ${sum} ชิ้น`; // แสดงข้อความคงเหลือจำนวนสินค้า

  return (
    // การแสดงผลข้อมูลสินค้าภายในการ์ด
    <div className="bg-white shadow-lg rounded-lg p-5 flex items-center justify-between hover:shadow-xl transition-shadow duration-300 relative">
      {/* แสดงรูปภาพสินค้า */}
      <img
        src={product.media[0]}
        alt={product.title}
        className="w-48 h-48 object-cover rounded-lg"
      />
      <div className="p-4 flex-grow">
        {/* ชื่อสินค้า */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">{product.title}</h2>
        <div className="flex items-center mb-4">
          {/* ป้ายแสดงจำนวนสินค้าที่เหลือ */}
          <button
            className={`px-3 py-1 text-sm rounded-full text-white font-semibold ${
              sum === 0 ? 'bg-red-500'  // สีแดงเมื่อสินค้าหมด
              : 'bg-green-500' // สีเขียวเมื่อสินค้ามี (sum > 0)
            }`}
          >
            {quantityLabel}   {/* ป้ายแสดงจำนวนสินค้าที่เหลือ */}
          </button>
        </div>
        {/* ปุ่มสำหรับดูรายละเอียดสินค้า */}
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md transition-transform duration-300 ease-in-out hover:bg-purple-600 hover:scale-105 absolute bottom-4 right-4"
          onClick={() => (window.location.href = `/products/${product._id}`)}
        >
          ดูรายละเอียดสินค้า   {/* ปุ่มสำหรับดูรายละเอียดสินค้า */}
        </button>
      </div>
    </div>
  );
};

// หน้าหลักแสดงสินค้า
const Products = () => {
  const router = useRouter(); // ใช้ router ในการนำทางไปยังหน้าอื่น
  const [loading, setLoading] = useState(true); // กำหนดสถานะการโหลด
  const [products, setProducts] = useState<ProductType[]>([]); // เก็บข้อมูลสินค้าที่ดึงมา
  const [searchTerm, setSearchTerm] = useState(""); // เก็บข้อความค้นหา

  // ฟังก์ชันดึงข้อมูลสินค้าจาก API
  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });

      const data = await res.json(); // แปลงข้อมูลที่ได้รับเป็น JSON
      setProducts(data.products); // ตั้งค่าข้อมูลสินค้า
      setLoading(false); // ปิดการโหลด
    } catch (err) {
      console.log("[getProducts]", err); // แสดง เออเร่อถ้ามีนะ
    }
  };

  // ใช้ useEffect เพื่อดึงข้อมูลเมื่อ component ถูกโหลดครั้งแรก
  useEffect(() => {
    getProducts();
  }, []);

  // ฟิลเตอร์สินค้าตามคำค้นหา
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return loading ? (
    <Loader /> // แสดง Loader ขณะดึงข้อมูล
  ) : (
    <div className="px-10 py-5 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        {/* หัวข้อหน้าสินค้า */}
        <h1 className="text-heading3-bold font-bold text-gray-800">สต๊อกสินค้า</h1>
        {/* ปุ่มสำหรับเพิ่มสินค้าใหม่ */}
        <Button
          className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 transition-transform duration-300 ease-in-out"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h-5 w-5 mr-2" />
          เพิ่มสินค้า    {/* ปุ่มสำหรับเพิ่มสินค้าใหม่ */}
        </Button>
      </div>

      {/* เส้นแบ่ง */}
      <hr className="border-t-2 border-gray-300 my-4" />
      
      {/* ช่องค้นหาสินค้า */}
      <Input
        placeholder="ค้นหาสินค้า..." // ช่องค้นหาสินค้า
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
      />

      {/* แสดงรายการสินค้า */}
      <div className="grid grid-cols-2 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} /> // แสดงการ์ดสินค้าแต่ละตัว
          ))
        ) : (
          <p className="text-gray-500">ไม่พบสินค้าที่ค้นหา</p> // แสดงข้อความเมื่อไม่พบสินค้า
        )}
      </div>
    </div>
  );
};

// ส่งออก component Products
export default Products;
