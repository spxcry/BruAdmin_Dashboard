// ใช้คำสั่ง "use client" เพื่อบอกว่า component นี้รันบน client-side
'use client';

// นำเข้า useRouter จาก next/navigation
import { useRouter } from "next/navigation";
// นำเข้า useEffect และ useState จาก React
import { useEffect, useState } from "react";
// นำเข้า component Loader จาก custom UI
import Loader from "@/components/custom ui/Loader";
// นำเข้า component Button จาก UI
import { Button } from "@/components/ui/button";
// นำเข้า icon Plus จาก lucide-react
import { Plus } from "lucide-react";
// นำเข้า component Input จาก UI
import { Input } from "@/components/ui/input";


// กำหนด interface สำหรับ CollectionType
interface CollectionType {
  _id: string;
  title: string;
  quantity?: number;
  media: string[];
}

// component CollectionCard ที่รับ prop collection
const CollectionCard = ({ collection }: { collection: CollectionType }) => {
  
  // กำหนดวันที่ปัจจุบันในรูปแบบไทย
  const currentDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    // การแสดงผลข้อมูล collection ในรูปแบบ card
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between hover:shadow-2xl transition-shadow duration-300 relative">
      {/* แสดงรูปภาพคอลเลคชั่น */}
      <img
        src={collection.media[0]}
        alt={collection.title}
        className="w-48 h-48 object-cover rounded-lg"
      />
      <div className="p-4 flex-grow">
        {/* ชื่อคอลเลคชั่น */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{collection.title}</h2>
        <div className="flex items-center mb-4">
          {/* ปุ่ม HOT */}
          <button
            className="px-3 py-1 text-sm rounded-full font-semibold text-white bg-red-500 shadow-md hover:bg-red-600 transition-all duration-300"
          >
            HOT
          </button>
        </div>
        {/* วันที่ปัจจุบัน */}
        <p className="text-gray-500 mb-4">{currentDate}</p>
        {/* ปุ่มดูรายละเอียด */}
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-lg transition-transform duration-300 ease-in-out hover:bg-purple-600 hover:scale-105 absolute bottom-4 right-4"
          onClick={() => window.location.href = `/collections/${collection._id}`}
        >
          ดูรายละเอียดคอลเลคชั่น
        </button>
      </div>
    </div>
  );
};

// component Collections สำหรับแสดงรายการคอลเลคชั่น
const Collections = () => {
  const router = useRouter(); // ใช้ hook useRouter
  const [loading, setLoading] = useState(true); // state สำหรับ loading
  const [collections, setCollections] = useState<CollectionType[]>([]); // state สำหรับเก็บข้อมูลคอลเลคชั่น
  const [searchTerm, setSearchTerm] = useState(""); // state สำหรับเก็บค่าการค้นหา

  // ฟังก์ชันสำหรับดึงข้อมูลคอลเลคชั่น
  const getCollections = async () => {
    try {
      // เรียก API เพื่อดึงข้อมูลคอลเลคชั่น
      const res = await fetch("/api/collections", {
        method: "GET",
      });

      const data = await res.json();
      setCollections(data.collections); // อัพเดต state collections ด้วยข้อมูลที่ได้จาก API
      setLoading(false); // ปิดการโหลดเมื่อข้อมูลถูกดึงมาแล้ว
    } catch (err) {
      // แสดง error ในกรณีที่เกิดปัญหา
      console.log("[getCollections]", err);
    }
  };

  // ใช้ useEffect เพื่อเรียก getCollections เมื่อ component ถูก mount
  useEffect(() => {
    getCollections();
  }, []);

  // กรองคอลเลคชั่นตามคำค้นหา
  const filteredCollections = collections.filter((collection) =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ถ้า loading ให้แสดง Loader component; ถ้าไม่ ให้แสดงรายการคอลเลคชั่น
  return loading ? (
    <Loader />
  ) : (
    <div className="px-8 py-5 bg-gray-100 min-h-screen"> {/* เปลี่ยนพื้นหลังเป็นสีเทา */}
      <div className="flex items-center justify-between mb-6">
        {/* หัวข้อคอลเลคชั่น */}
        <h1 className="text-heading3-bold text-gray-800">คอลเลคชั่น</h1>
        {/* ปุ่มเพิ่มคอลเลคชั่น */}
        <Button
          className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition-transform duration-300 ease-in-out"
          onClick={() => router.push("/collections/new")}
        >
          <Plus className="h-5 w-5 mr-2" />
          เพิ่มคอลเลคชั่น
        </Button>
      </div>

      {/* เส้นแบ่ง */}
      <hr className="border-t-2 border-gray-300 my-4" />
      
      {/* ช่องค้นหา */}
      <Input
        placeholder="ค้นหาคอลเลคชั่น..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
      />

      {/* แสดงรายการคอลเลคชั่น */}
      <div className="grid grid-cols-2 gap-8">
        {filteredCollections.length > 0 ? (
          // ถ้ามีคอลเลคชั่นที่ผ่านการกรอง ให้แสดง CollectionCard
          filteredCollections.map((collection) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))
        ) : (
          // ถ้าไม่มีคอลเลคชั่นที่ค้นหา ให้แสดงข้อความ
          <p className="text-gray-500">ไม่พบคอลเลคชั่นที่ค้นหา</p>
        )}
      </div>
    </div>
  );
};

// export ฟังก์ชัน Collections เป็น default
export default Collections;
